<script>
import IconClose from '@/icon/IconClose.vue';
import IconExplorer from '@/icon/IconExplorer.vue';
import MenuItem from './MenuItem.vue';
import IconLogout from '@/icon/IconLogout.vue';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseApp";
import IconPlus from '@/icon/IconPlus.vue';
import NewMeal from './NewMeal.vue';
import { addMealForUser, exportMeals, importMeals } from '@/library/bdd';
import IconExport from '@/icon/IconExport.vue';
import IconImport from '@/icon/IconImport.vue';
import IconRandom from '@/icon/IconRandom.vue';


export default {
    data() {
        return {
            showMenu: true
        }
    },
    props: {
        meals: {
            type: Array,
            default: () => []
        }
    },
    emits: ['close', 'select', 'roll', 'add'],
    components: {
        IconExplorer,
        IconClose,
        IconLogout,
        IconPlus,
        IconExport,
        IconImport,
        IconRandom,
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
            const mealId = await addMealForUser(auth.currentUser?.uid, newMeal);
            this.showMenu = true;
            this.$emit('add', mealId);
        } catch(e) {
            console.error(e);
        }
      },
      async exportMeals() {
        await exportMeals(this.meals);
      },
      importMeals() {
        this.$refs.fileInput.click();
      },
      async handleFileImport(event) {
        const file = event.target.files[0];

        if (!file) return;

        try {
          await importMeals(auth.currentUser?.uid, file);
          this.$emit('close', true); // refresh
        } catch (e) {
          console.error(e);
        }
      
        // reset input (important pour pouvoir re-importer le même fichier)
        event.target.value = "";
      },
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
            <MenuItem @click="exportMeals">
              <IconExport></IconExport>
            </MenuItem>
            <MenuItem @click="importMeals">
              <IconImport></IconImport>
            </MenuItem>
            <MenuItem @click="startNewMealCreation">
                <IconPlus></IconPlus>
            </MenuItem>
            <MenuItem>
              <IconRandom @roll="$emit('roll')" ></IconRandom>
            </MenuItem>
        </div>
        <NewMeal 
            v-if="!showMenu" 
            @cancel="stopNewMealCreation" 
            @submit="createNewMeal">
        </NewMeal>
        <input 
          type="file" 
          ref="fileInput" 
          accept="application/json"
          style="display: none"
          @change="handleFileImport"
        />
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
    justify-content: space-evenly;
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