<script>
import { auth } from "../../firebaseApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { logginAnimation } from "@/library/animation";
import { syncUserWithFirestore } from "@/library/bdd";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default {
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("Connexion réussis de :", user.uid);

        window.__PRELOAD_HOME__?.();
        await syncUserWithFirestore(user);
        await this.$nextTick();
        await logginAnimation();
        this.$router.replace("/");
        window.__STOP_PRELOAD__?.();

      } catch (error) {
        console.error("Erreur login:", error);
      }
    }
  },
  mounted() {
    document.body.classList.add("no-margin");
    window.__PRELOAD_HOME__?.();
  },
  unmounted() {
    document.body.classList.remove("no-margin");
  }

}
</script>

<template>
  <div class="login-view">
    <div class="background">
      <div class="background-layer"></div>
      
      <div class="blob blob-top"></div>
      <div class="blob blob-bottom"></div>
      
      <div class="content">
        <h1 class="home-title">On Mange <span class="quoi">Quoi ?</span></h1>
        <button class="google-button" @click="loginWithGoogle">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          <span>Continuer avec Google</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.background-layer {
  position: absolute;
  inset: 0;
  background-color: var(--bg);
}

.background {
    position: relative;
    overflow: hidden;
    z-index: 2;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.blob {
  position: absolute;
  width: 668px;
  height: 693px;
  background: url('@/icon/Blob.svg') no-repeat;
  background-size: contain;
  z-index: 0;
}

.blob-top {
  top: -480px;
  left: -80px;
}

.blob-bottom {
  bottom: -480px;
  left: -80px;
  transform: rotate(90deg);
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
}


.google-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  padding: 10px 16px;
  border-radius: 999px;

  background-color: white;
  color: #3c4043;

  font-size: 14px;
  font-weight: 500;
  font-family: Roboto, Arial, sans-serif;

  border: 1px solid #dadce0;
  cursor: pointer;

  transition: all 0.2s ease;
}

.google-button img {
  width: 18px;
  height: 18px;
}

/* hover officiel */
.google-button:hover {
  background-color: #f7f8f8;
  box-shadow: 0 1px 2px rgba(60,64,67,0.3);
}

/* active */
.google-button:active {
  background-color: #eee;
}

/* focus (accessibilité Google) */
.google-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #4285f4;
}
</style>
