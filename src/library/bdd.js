import { doc, getDoc, setDoc, updateDoc, addDoc, serverTimestamp, collection } from "firebase/firestore";
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