<script>
import IconDuration from '@/icon/IconDuration.vue';
import Difficulty from './Difficulty.vue';

export default {
    name: 'Card',
    props: {
        meal: Object
    },
    emits: ['select'],
    data() {
        return {
            
        }
    },
    components: {
        IconDuration,
        Difficulty
    }
}
</script>

<template>
    <div class="card" :data-flip-id="'card-' + meal?.id" @click="$emit('select', $event)">
        <div class="content">
            <div>{{meal.name}}</div>
            <div class="duration"><IconDuration></IconDuration> {{meal.duration}}"</div>
            <div><Difficulty :difficulty="meal.difficulty"></Difficulty></div>
        </div>
    </div>
</template>


<style scoped>

.card {
    position: relative;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
    padding: 8px;
    border-radius: 32px;
    border: #E5E7EB solid 1px;
    height: 150px;
    min-width: 100px;
    width: calc(50vw - 30px);
    overflow: hidden;
}

.card::after {
    content: "";
    position: absolute;

    top: -646px;
    left: -140px;

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
    bottom: 8px;
    overflow-wrap: anywhere;
}

.duration {
    display: flex;
    gap: 4px;
}

</style>