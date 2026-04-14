<script>
import IconDifficulty from '@/icon/IconDifficulty.vue';

export default {
    props: {
        difficulty: Number
    },
    components: {
        IconDifficulty
    }

}
</script>

<template>
    <div class="difficulty">
        <div v-for="index in difficulty">
            <IconDifficulty></IconDifficulty>
        </div>
    </div>
</template>

<style scoped>
.difficulty {
    display: flex;
}
</style>
