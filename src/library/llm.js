export const createMeal = async (name, key) => {
  const allowedTags = [
    "Plat","Viande","Poisson","Féculent","Légumes",
    "Sandwich","Dessert","Goûter",
    "Froid","Chaud",
    "Complet","Accompagnement",
    "Commande","Industriel"
  ];

  // ---------------------------
  // JSON SAFE PARSER
  // ---------------------------
  const safeJsonParse = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error("❌ JSON parse error:", str);

      try {
        const cleaned = str
          .replace(/```json|```/g, "")
          .trim();

        return JSON.parse(cleaned);
      } catch (err) {
        console.error("❌ JSON recovery failed:", err);
        return null;
      }
    }
  };

  // ---------------------------
  // VALIDATION MÉTIER COMPLÈTE
  // ---------------------------
  const validateMeal = (meal) => {
    if (!meal || typeof meal !== "object") {
      console.error("❌ Meal invalide:", meal);
      return null;
    }

    let difficulty = Number(meal.difficulty);
    let duration = Number(meal.duration);

    // 🔥 règles difficulty strictes
    if (![1, 2, 3].includes(difficulty)) {
      difficulty = 1;
    }

    // 🔥 règles duration réalistes (cohérentes métier)
    if (!duration || isNaN(duration)) {
      duration = 10;
    }

    // ---------------------------
    // TAGS (règles métier complètes)
    // ---------------------------
    let tags = Array.isArray(meal.tags) ? meal.tags : [];

    tags = tags.filter(t => allowedTags.includes(t));

    // règle obligatoire
    if (!tags.includes("Plat")) {
      tags.unshift("Plat");
    }

    // correction logique métier implicite
    const hasViande = tags.includes("Viande");
    const hasPoisson = tags.includes("Poisson");
    const hasFroid = tags.includes("Froid");
    const hasChaud = tags.includes("Chaud");

    // sécurité température
    if (!hasFroid && !hasChaud) {
      tags.push("Chaud");
    }

    // règle cohérence repas complet
    const hasFeculent = tags.includes("Féculent");
    const hasLegumes = tags.includes("Légumes");

    const isComplete = hasViande || hasPoisson
      ? hasFeculent && hasLegumes
      : false;

    if (isComplete && !tags.includes("Complet")) {
      tags.push("Complet");
    }

    // ---------------------------
    // FINAL OBJECT
    // ---------------------------
    return {
      name,
      note: "",
      recipe: "",
      difficulty,
      duration,
      tags
    };
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: `
Tu es un générateur STRICT de JSON.

⚠️ RÈGLES ABSOLUES :
- JSON uniquement
- aucun texte autour
- aucun markdown
- aucun commentaire

────────────────────────
SCHÉMA OBLIGATOIRE
────────────────────────
{
  "name": string,
  "note": string,
  "recipe": string,
  "difficulty": 1 | 2 | 3,
  "duration": number,
  "tags": string[]
}

────────────────────────
DIFFICULTÉ (règles métier)
────────────────────────
1 = très simple (assemblage, cuisson basique)
2 = intermédiaire (plusieurs étapes, cuisson contrôlée, niveau de compétence moyen)
3 = complexe (réduction, mijotage, niveau de compétence avoir l'habitude de cuisiner)

────────────────────────
DURÉE (règles métier)
────────────────────────
- fast food / sandwich : 5–15 min
- plat maison : 10–30 min
- plat élaboré : 30–60 min
- plat traditionnel : 60–120 min

────────────────────────
TAGS (STRICT)
────────────────────────
Uniquement :
${allowedTags.join(", ")}

RÈGLES :
- "Commande" = fast-food / livraison / commande sur uber eat
- "Industriel" = surgelé / prêt à consommer
- "Complet" = Viande et Légume / Poisson et Féculent / Autre plat principale
- ne jamais inventer de tags
- toujours cohérent avec le plat
- s'inspire de site spécialisé comme marmiton pour les durée

────────────────────────
EXEMPLES
────────────────────────
Pizza → ["Plat","Féculent","Chaud","Complet","Commande"]
Burger → ["Plat","Viande","Sandwich","Chaud","Complet","Commande"]
Salade → ["Plat","Légumes","Froid"]
Poulet →  ["Plat","Viande","Chaud"]
Blanquette → ["Plat","Viande","Chaud","Complet"]
            `.trim()
          },
          {
            role: "user",
            content: `Créer un meal pour : "${name}"`
          }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("Réponse IA vide");
    }

    console.log("🧾 RAW AI:", result);

    const parsed = safeJsonParse(result);

    if (!parsed) {
      throw new Error("JSON invalide même après recovery");
    }

    const meal = validateMeal(parsed);

    if (!meal) {
      throw new Error("Validation métier échouée");
    }

    return meal;

  } catch (err) {
    console.error("🔥 createMeal error:", {
      message: err.message,
      name
    });
    throw err;
  }
};