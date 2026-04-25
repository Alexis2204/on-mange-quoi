import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  serverTimestamp, 
  collection,
  getDocs, 
  query,
  where,
  writeBatch
 } from "firebase/firestore";
import { db } from "../../firebaseApp";

export const syncUserWithFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        lastConnexion: serverTimestamp(),
      });
    } else {
      await setDoc(userRef, {
        id: user.uid,
        createdAt: serverTimestamp(),
        lastConnexion: serverTimestamp(),
      });
    }

  } catch (error) {
    console.error("Erreur sync user:", error);
  }
};

export const addMealForUser = async (userId, meal) => {
  try {
    if (!userId) {
      console.error("pas de userId");

    }
    // 1️⃣ Ajouter dans la collection globale
    const mealRef = await addDoc(collection(db, "meals"), {
      name: meal.name,
      tags: meal.tags || [],
      duration: meal.duration,
      difficulty: meal.difficulty || 1,
      recipe: meal.recipe || "",

      createdBy: userId,
      createdAt: serverTimestamp(),
      usageCount: 0,
    });

    // 2️⃣ Ajouter dans la liste perso (référence)
    const userMealRef = doc(
      db,
      "users",
      userId,
      "meals",
      mealRef.id
    );

    await setDoc(userMealRef, {
      mealId: mealRef.id,
      addedAt: serverTimestamp(),
      lastEatenAt: null,
    });

    return mealRef.id;

  } catch (error) {
    console.error("Erreur ajout meal:", error);
    throw error;
  }
};

export const getUserMeals = async (userId) => {
  try {
    // 1️⃣ récupérer les refs user
    const snapshot = await getDocs(
      collection(db, "users", userId, "meals")
    );

    const mealIds = snapshot.docs.map(doc => doc.data().mealId);

    if (mealIds.length === 0) return [];

    // 2️⃣ fetch parallèle 🔥
    const meals = await Promise.all(
      mealIds.map(async (id) => {
        const snap = await getDoc(doc(db, "meals", id));
        if (!snap.exists()) return null;

        return {
          id: snap.id,
          ...snap.data()
        };
      })
    );

    // 3️⃣ clean + tri
    return meals
      .filter(Boolean)
      .sort((a, b) =>
        a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
      );

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addMealsBatchForUser = async (userId, jsonPath) => {
  const response = await fetch(jsonPath);
  const meals = await response.json();

  try {
    if (!userId) {
      throw new Error("Pas de userId");
    }

    const batch = writeBatch(db);

    for (const meal of meals) {
      // 🔥 créer une ref AVANT (pas addDoc)
      const mealRef = doc(collection(db, "meals"));

      batch.set(mealRef, {
        name: meal.name,
        tags: meal.tags || [],
        duration: meal.duration,
        difficulty: meal.difficulty || 1,
        recipe: meal.recipe || "",

        createdBy: userId,
        createdAt: serverTimestamp(),
        usageCount: 0,
      });

      // 🔗 ajouter dans user/meals
      const userMealRef = doc(
        db,
        "users",
        userId,
        "meals",
        mealRef.id
      );

      batch.set(userMealRef, {
        mealId: mealRef.id,
        addedAt: serverTimestamp(),
        lastEatenAt: null,
      });
    }

    // 🚀 1 seule requête
    await batch.commit();

    console.log("Batch import terminé 🚀");

  } catch (error) {
    console.error("Erreur batch:", error);
    throw error;
  }
};