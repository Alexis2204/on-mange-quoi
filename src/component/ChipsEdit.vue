<script>
import Chip from './Chip.vue';


export default {
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        allTags: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:modelValue'],
    components: {
        Chip
    },
    methods: {
        toggleTag(tag) {
            let newTags = [...this.modelValue];
            if (this.modelValue.includes(tag)) {
                newTags = newTags.filter(t => t !== tag);
            } else {
                newTags.push(tag);
            }
            this.$emit('update:modelValue', newTags);
        },
        getState(tag) {
            return this.modelValue.includes(tag) ? "include" : "neutral";
        }
    }
}
</script>

<template>
    <div class="chips-edit">
        <Chip v-for="tag in allTags" :name="tag" :key="tag" :state="getState(tag)" @click="toggleTag(tag)"></Chip>
    </div>
</template>

<style scoped>
.chips-edit {
    display: flex;
    gap: 8px;
    font-size: small;
    flex-wrap: wrap;
}
</style>