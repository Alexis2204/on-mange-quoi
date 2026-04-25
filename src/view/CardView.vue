<script>
import Difficulty from '@/component/Difficulty.vue';
import IconDuration from '@/icon/IconDuration.vue';

export default {
    name: 'CardView',
    data() {
        return {
            edit: true,
        }
    },
    props: {
        meal: Object
    },
    emits: ['close'],
    components: {
        Difficulty,
        IconDuration
    }
}
</script>

<template>
    <div class="card-view" @click="$emit('close')">
        <div class="card" :data-flip-id="'card-' + meal.id">
            <div class="content">
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
                <div v-if="meal.lastEatenAt" class="element">
                    <h5>Mangé pour la dernière fois</h5>
                    <div>{{ meal.lastEatenAt }}</div>
                </div>
                <div class="element">
                    <h5>Recette</h5>
                    <div v-if="meal.recipe">{{ meal.recipe }}</div>
                    <div class="info" v-else>Ajouter une recette</div>
                </div>
            </div>
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

.info {
    color: var(--text-color-secondary);
}

.duration {
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>