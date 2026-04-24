<script>
import IconClose from '@/icon/IconClose.vue';
import IconExplorer from '@/icon/IconExplorer.vue';
import MenuItem from './MenuItem.vue';
import IconLogout from '@/icon/IconLogout.vue';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseApp";
import IconPlus from '@/icon/IconPlus.vue';
import NewMeal from './NewMeal.vue';
import { addMealForUser } from '@/library/bdd';


export default {
    data() {
        return {
            showMenu: true
        }
    },
    components: {
        IconExplorer,
        IconClose,
        IconLogout,
        IconPlus,
        MenuItem,
        NewMeal
    },
    methods: {
      async logout() {
        try {
          await signOut(auth);
          this.$router.push("/login");
        } catch (error) {
          console.error("Erreur logout:", error);
        }
      },
      startNewMealCreation() {
        this.showMenu = false;
      },
      stopNewMealCreation() {
        this.showMenu = true;
      },
      async createNewMeal(newMeal) {
        try {
            await addMealForUser(auth.currentUser?.uid, newMeal);
            this.showMenu = true;
            this.$emit('close');
        } catch(e) {
            console.error(e);
        }
      }
    }
}

</script>

<template>
    <div class="menu">
        <div class="header">
            <IconExplorer :height="35"></IconExplorer>
            <span>Explorer</span>
            <IconClose :height="35" @click="$emit('close')"></IconClose>
        </div>
        <div v-if="showMenu" class="content">
            <MenuItem @click="logout">
                <IconLogout></IconLogout>
            </MenuItem>
            <MenuItem @click="startNewMealCreation">
                <IconPlus></IconPlus>
            </MenuItem>
        </div>
        <NewMeal 
            v-if="!showMenu" 
            @cancel="stopNewMealCreation" 
            @submit="createNewMeal">
        </NewMeal>
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
    border: 1px solid var(--text-color);
    border-bottom: 0;
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
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.footer {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: -50px;
    background-color: white;
}
</style>