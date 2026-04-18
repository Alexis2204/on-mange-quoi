<script>
import IconClose from '@/icon/IconClose.vue';
import IconExplorer from '@/icon/IconExplorer.vue';
import MenuItem from './MenuItem.vue';
import IconLogout from '@/icon/IconLogout.vue';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseApp";


export default {

    components: {
        IconExplorer,
        IconClose,
        IconLogout,
        MenuItem
    },
    methods: {
      async logout() {
        try {
          await signOut(auth);
          this.$router.push("/login");
        } catch (error) {
          console.error("Erreur logout:", error);
        }
      }
    }
}

</script>

<template>
    <div class="menu">
        <div class="header">
            <IconExplorer :height="32"></IconExplorer>
            <span>Explorer</span>
            <IconClose :height="32" @click="$emit('close')"></IconClose>
        </div>
        <div class="content">
            <MenuItem @click="logout">
                <IconLogout></IconLogout>
            </MenuItem>
        </div>
        <div class="footer"></div>
    </div>
</template>


<style scoped>

.menu {
    position: fixed;
    bottom: 0;
    z-index: 9;
    background-color: white;
    width: 100vw;
    border-radius: 32px 32px 0 0;
    border: 1px solid #E5E7EB;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: x-large;
    padding: 8px 16px 0 16px;
}

.content {
    padding: 16px;
}

.footer {
  width: 100vw;
  height: 50px;
}
</style>