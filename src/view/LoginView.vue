<script>
import { auth } from "../../firebaseApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("UID:", user.uid);

        // 👉 redirection après login
        this.$router.push("/");
      } catch (error) {
        console.error("Erreur login:", error);
      }
    }
  },
  mounted() {
    document.body.classList.add("no-margin");
  },
  unmounted() {
    document.body.classList.remove("no-margin");
  }

}
</script>

<template>
  <div class="login-view">
    <div class="background">
        <div class="content">
          <h1>On Mange <span class="quoi">Quoi ?</span></h1>
          <button @click="loginWithGoogle">
            Se connecter avec Google
          </button>
          <!-- Google sign-in here -->
        </div>
    </div>
  </div>
</template>

<style scoped>
.background {
    position: relative;
    overflow: hidden;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
}

.background::before {
  content: "";
  position: absolute;

  top: -480px;
  left: -80px;

  width: 668px;
  height: 693px;

  background: url('@/icon/Blob.svg') no-repeat;
  background-size: contain;

  z-index: 0;
}

.background::after {
  content: "";
  position: absolute;

  bottom: -480px;
  left: -80px;

  width: 668px;
  height: 693px;

  background: url('@/icon/Blob.svg') no-repeat;
  background-size: contain;

  transform: rotate(90deg);

  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;

  text-align: center;
}
</style>
