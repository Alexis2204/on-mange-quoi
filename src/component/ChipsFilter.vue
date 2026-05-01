<script>
import Chip from './Chip.vue';

export default {
    props: {
        includeTags: {
            type: Array,
            default: () => []
        },
        excludeTags: {
            type: Array,
            default: () => []
        },
        allTags: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update'],
    components: { Chip },

    methods: {
        getState(tag) {
            if (this.includeTags.includes(tag)) return "include";
            if (this.excludeTags.includes(tag)) return "exclude";
            return "neutral";
        },

        toggle(tag) {
            const isInclude = this.includeTags.includes(tag);
            const isExclude = this.excludeTags.includes(tag);

            let newInclude = [...this.includeTags];
            let newExclude = [...this.excludeTags];

            if (!isInclude && !isExclude) {
                // neutral → include
                newInclude.push(tag);
            } else if (isInclude) {
                // include → exclude
                newInclude = newInclude.filter(t => t !== tag);
                newExclude.push(tag);
            } else {
                // exclude → neutral
                newExclude = newExclude.filter(t => t !== tag);
            }

            this.$emit('update', {
                includeTags: newInclude,
                excludeTags: newExclude
            });
        }
    }
}
</script>

<template>
    <div class="chips-filter">
        <Chip
            v-for="tag in allTags"
            :key="tag"
            :name="tag"
            :state="getState(tag)"
            @click="toggle(tag)"
        />
    </div>
</template>

<style scoped>
.chips-filter {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    font-size: small;
}
</style>