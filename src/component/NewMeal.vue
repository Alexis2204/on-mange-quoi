<script>
import IconBack from '@/icon/IconBack.vue';
import DifficultyEdit from './DifficultyEdit.vue';
import IconSoon from '@/icon/IconSoon.vue';
import IconValidation from '@/icon/IconValidation.vue';

export default {
    data() {
        return {
            step: 0,
            newMeal: {
                name: "",
                duration: 0,
                difficulty: 1
            }
        }
    },
    components: {
        DifficultyEdit,
        IconBack, 
        IconSoon,
        IconValidation
    },
    emits: ['cancel', 'submit'],
    methods: {
        next() {
            this.step += 1;
        },
        back() {
            if (this.step == 0) {
                this.$emit('cancel');
            } else {
                this.step -= 1;
            }
        },
        addNewMeal() {
            if (this.newMeal.name != "") {
                this.$emit('submit', this.newMeal);
            }

        }
    }
}
</script>

<template>
    <div class="new-meal">
        <div class="content">
            <IconBack class="width-icon" @click="back"></IconBack>
            <div class="step" v-if="step == 0">
                <h4>Nom</h4>
                <input type="text" v-model="newMeal.name" placeholder="Ex: Quiche Lorraine"/>
            </div>
            <div class="step" v-if="step == 1">
                <h4>Durée</h4>
                <input type="number" v-model.number="newMeal.duration" placeholder="15" />
            </div>
            <div class="step step-difficulty" v-if="step == 2">
                <h4>Difficulté</h4>
                <DifficultyEdit v-model="newMeal.difficulty"></DifficultyEdit>
            </div>
            <IconSoon class="width-icon" v-if="step < 2" @click="next"></IconSoon>
            <div v-if="step ==2" class="width-icon"></div>
        </div>
        <div class="footer">
            <button 
                class="valider"
                @click="addNewMeal">
                <IconValidation></IconValidation>
                <span>Valider</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.new-meal {
    padding: 16px;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.step {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

input {
    font-size: large;
    padding: 1;
}

h4 {
    margin: 0;
}

.width-icon {
    width: 64px;
}

.footer {
    padding-top: 16px;
    display: flex;
    justify-content: flex-end;
}

.step-difficulty {
    min-width: 227px;
}

</style>