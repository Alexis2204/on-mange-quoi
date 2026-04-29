<script>
import IconDifficulty from '@/icon/IconDifficulty.vue';

export default {
    data() {
        return {
            maxDifficulty: 3
        }
    },
    props: {
        difficulties: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:difficulties'],
    components: {
        IconDifficulty
    },
    methods: {
        toggleDifficultyLevel(level) {
            let newDifficulties = [...this.difficulties];
            if (this.difficulties.includes(level)) {
                newDifficulties = newDifficulties.filter(l => l !== level);
            } else {
                newDifficulties.push(level);
            }
            this.$emit('update:difficulties', newDifficulties);
        },
        isSelected(level) {
          return this.difficulties.includes(level);
        }
    }
}
</script>

<template>
    <div class="difficulty-filter">
        <IconDifficulty 
            v-for="level in maxDifficulty" 
            :enable="isSelected(level)"
            :height="28"
            @click="toggleDifficultyLevel(level)">
        </IconDifficulty>
    </div>
</template>