<script>
import Chip from './Chip.vue';


export default {
    props: {
        tags: {
            type: Array,
            default: () => []
        },
        allTags: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:tags'],
    components: {
        Chip
    },
    methods: {
        toggleTag(tag) {
            let newTags = [...this.tags];
            if (this.tags.includes(tag)) {
                newTags = newTags.filter(t => t !== tag);
            } else {
                newTags.push(tag);
            }
            this.$emit('update:tags', newTags);
        },
        isSelected(tag) {
          return this.tags.includes(tag);
        }
    }
}

</script>

<template>
    <div class="chips-edit">
        <Chip v-for="tag in allTags" :name="tag" :key="tag" :selected="isSelected(tag)" @click="toggleTag(tag)"></Chip>
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