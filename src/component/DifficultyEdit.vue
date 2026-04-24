<script>
import IconDifficulty from '@/icon/IconDifficulty.vue';

export default {
    props: {
        maxDifficulty: {
            type: Number,
            default: 3
        },
        modelValue: {
            type: Number,
            default: 1
        }
    },
    emits: ['update:modelValue'],
    components: {
        IconDifficulty
    },
    methods: {
        selectDifficulty(index) {
            this.$emit('update:modelValue', index);
        }
    }

}
</script>

<template>
    <div class="difficulty">
        <div class="fire" v-for="index in maxDifficulty" :key="index">
            <IconDifficulty :enable="index <= modelValue" :height="32" @click="selectDifficulty(index)"></IconDifficulty>
        </div>
    </div>
</template>

<style scoped>
.difficulty {
    display: flex;
}

.fire {
    height: 32px;
}
</style>
