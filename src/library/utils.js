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
        note: localMeal.note || ""
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

export const isVisible = (meal, search) => {
  let visible = true;

  if (search.query) {
    const queryLower = search.query.toLowerCase();
    visible = meal.name.toLowerCase().includes(queryLower);
  }

  if (search.tags && search.tags.length != 0) {
    visible = visible && meal.tags.some(tag => search.tags.includes(tag));
  }

  return visible;
}