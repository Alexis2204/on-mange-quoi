export const formatLastEatenAt = (timestamp) => {
  if (!timestamp) return "Jamais";

  const date = timestamp.toDate();
  const now = new Date();

  const diffDays = Math.floor(
    (now - date) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "🍽️ Aujourd’hui";
  if (diffDays === 1) return "🍽️ Hier";
  if (diffDays < 7) return `🍽️ ${diffDays} jours`;
  if (diffDays < 30) return `📅 ${Math.floor(diffDays / 7)} sem.`;

  return `📅 ${date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short"
  })}`;
};

export const mapLocalMealToUserMeal = (localMeal) => {
    return {
        note: localMeal.note
    }
}

export const mapLocalMealToMeal = (localMeal) => {
    return {
        name: localMeal.name,
        duration: localMeal.duration,
        difficulty: localMeal.difficulty,
        recipe: localMeal.recipe || "",
        tags: localMeal.tags || [],
    }
}