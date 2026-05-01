<script>
import Difficulty from '@/component/Difficulty.vue';
import IconDuration from '@/icon/IconDuration.vue';
import { updateLastEatenAt, updateMeal } from '@/library/bdd';
import { auth } from '../../firebaseApp';
import { formatLastEatenAt } from '@/library/utils';
import Chip from '@/component/Chip.vue';
import IconEdit from '@/icon/IconEdit.vue';
import IconClose from '@/icon/IconClose.vue';
import DifficultyEdit from '@/component/DifficultyEdit.vue';
import IconValidation from '@/icon/IconValidation.vue';
import ChipsEdit from '@/component/ChipsEdit.vue';

export default {
    name: 'CardView',
    data() {
        return {
            edit: false,
        }
    },
    props: {
        meal: Object,
        allTags: {
            type: Array,
            default: () => []
        }
    },
    emits: ['close'],
    components: {
        Difficulty,
        IconDuration,
        IconEdit,
        IconClose,
        IconValidation,
        Chip,
        DifficultyEdit,
        ChipsEdit
    },
    methods: {
        async manger() {
            await updateLastEatenAt(auth.currentUser?.uid, this.meal.id);
            this.$emit('close', true);
        },
        formatDate(timestamp) {
            return formatLastEatenAt(timestamp);
        },
        editOn() {
            this.edit = true;
        },
        editOff() {
            this.edit = false;
        },
        async update() {
            await updateMeal(auth.currentUser?.uid, this.meal);
            this.$emit('close', true);
        },
        close() {
            if (!this.edit) {
                this.$emit('close');
            }
        }
    }
}
</script>

<template>
    <div class="card-view">
        <IconEdit v-if="!edit" @click="editOn" class="icon"></IconEdit>
        <IconClose v-else @click="editOff" :height="48" class="icon"></IconClose>
        <div class="card" :data-flip-id="'card-' + meal.id" @click="close">
            <div v-if="!edit" class="content">
                <div class="element">
                    <h2>{{ meal.name }}</h2>
                </div>
                <div class="element">
                    <h5>Durée</h5>
                    <div class="duration"><IconDuration></IconDuration> {{ meal.duration }}"</div>
                </div>
                <div class="element">
                    <h5>Effort / Difficulté</h5>
                    <Difficulty :difficulty="meal.difficulty"></Difficulty>
                </div>
                <div class="element">
                    <h5>Mangé pour la dernière fois</h5>
                    <div>{{ formatDate(meal.lastEatenAt) }}</div>
                </div>
                <div class="element">
                    <h5>Recette</h5>
                    <a v-if="meal.recipe">{{ meal.recipe }}</a>
                    <div class="info" v-else>Ajouter une recette...</div>
                </div>
                <div class="element">
                    <h5>Tags</h5>
                    <div class="chips">
                        <Chip v-if="meal.tags && meal.tags.length" v-for="tag in meal.tags" :name="tag"></Chip>
                        <div class="info">Ajouter un tag...</div>
                    </div>
                </div>
                <div class="element">
                    <h5>Note</h5>
                    <div v-if="meal.note"> {{ meal.note }}</div>
                    <div v-else class="info">Ajouter une note...</div>
                </div>
            </div>
            <div v-else class="content">
                <div class="element">
                    <h5>Nom</h5>
                    <input type="text" v-model="meal.name"/>
                </div>
                <div class="element">
                    <h5>Durée</h5>
                    <input type="number" v-model="meal.duration"/>                    
                </div>
                <div class="element">
                    <h5>Difficulté</h5>
                    <DifficultyEdit v-model="meal.difficulty"></DifficultyEdit>
                </div>
                <div v-if="meal.lastEatenAt" class="element">
                    <h5>Mangé pour la dernière fois</h5>
                    <div>{{ formatDate(meal.lastEatenAt) }}</div>
                </div>
                <div class="element">
                    <h5>Recette</h5>
                    <input type="text" v-model="meal.recipe" placeholder="Ajouter une recette..."/>
                </div>
                <div class="element">
                    <h5>Tags</h5>
                    <div class="chips">
                        <ChipsEdit v-model="meal.tags" :all-tags="allTags"></ChipsEdit>
                    </div>
                </div>
                <div class="element">
                    <h5>Note</h5>
                    <textarea name="note" id="note" v-model="meal.note"></textarea>
                </div>
            </div>
        </div>
        <div class="footer">
            <button v-if="!edit" class="manger" @click="manger">{{ meal.name }}, je te choisis !</button>
            <button v-else @click="update"><IconValidation></IconValidation> Valider</button>
        </div>
    </div>
</template>

<style scoped>
.card-view {
    position: fixed;
    inset: 0;
    background: white;
    z-index: 100;
    display: flex;
}

.card {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
    padding: 8px;
    border: #E5E7EB solid 1px;
}

.card::after {
    content: "";
    position: absolute;

    top: -620px;
    left: -115px;

    width: 668px;
    height: 693px;

    background: url('@/icon/Blob.svg') no-repeat;
    background-size: contain;

    z-index: 0;
}

.content {
    position: absolute;
    z-index: 1;
    left: 8px;
    top: 64px;
    overflow-wrap: anywhere;
    font-size: large;
}

.duration {
    display: flex;
    align-items: center;
    gap: 4px;
}

.footer {
    position: fixed;
    bottom: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
}
.icon {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 12;
}
.manger {
    background-color: var(--color-primary);
    border: solid 1ps var(--color-primary);
    color: white;
    max-width: calc(100vw - 32px);
    z-index: 12;
}

.chips {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
}
input {
    z-index: 12;
}
</style>