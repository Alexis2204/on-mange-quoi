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
        note: localMeal.note || "",
        recipe: localMeal.recipe || ""
    }
}

export const mapLocalMealToMeal = (localMeal) => {
    return {
        name: localMeal.name,
        duration: localMeal.duration,
        difficulty: localMeal.difficulty,
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

  if (search.difficulties && search.difficulties.length != 0) {
    visible = visible && search.difficulties.includes(meal.difficulty);
  }

  if (search.durations && search.durations.length != 0) {
    visible = visible && matchDuration(meal.duration, search.durations);
  }

  return visible;
}

const matchDuration = (mealDuration, durations) => {
  return durations.some(range => {
    if (range === "lt15") return mealDuration < 15;
    if (range === "15-30") return mealDuration >= 15 && mealDuration <= 30;
    if (range === "30-60") return mealDuration > 30 && mealDuration <= 60;
    if (range === "gt60") return mealDuration > 60;
  });
}

export const sortMeals = (meals, search) => {
  return meals.sort((a, b) => {
      let valA = a[search.sortBy];
      let valB = b[search.sortBy];

      // fallback pour lastEatenAt null
      if (search.sortBy === "lastEatenAt") {
        valA = valA?.seconds || 0;
        valB = valB?.seconds || 0;
      }

      if (typeof valA === "string") {
        return search.orderBy === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return search.orderBy === "asc"
        ? valA - valB
        : valB - valA;
    });
}

export const getGlobaleMealFromNewMeal = (newMeal, userId, timestamp) => {
  return {
    name: newMeal.name,
    tags: newMeal.tags || [],
    duration: newMeal.duration,
    difficulty: newMeal.difficulty || 1,
    createdBy: userId,
    createdAt: timestamp,
    usageCount: 0,
  }
}


export const getUserMealFromNewMeal = (mealId, newMeal, timestamp) => {
  return {
    mealId: mealId,
    addedAt: timestamp,
    lastEatenAt: null,
    note: newMeal.note || "",
    recipe: newMeal.recipe || "",
  }
}