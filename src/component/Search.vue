<script>
import ChipsFilter from './ChipsFilter.vue';
import SearchBar from './SearchBar.vue';


export default {
    props: {
        modelValue: {
            type: Object,
            default: {}
        },
        tags: Array
    },
    emits: ['update:modelValue'],
    components: {
        SearchBar,
        ChipsFilter
    },
    methods: {
      update(field, value) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          [field]: value
        });
      }
    }
}
</script>

<template>
    <div class="search">
        <SearchBar :query="modelValue.query" @update:query="update('query', $event)"></SearchBar>
        <div class="info">
            Recherche avancée 
        </div>
        <ChipsFilter :tags="modelValue.tags" :all-tags="tags" @update:tags="update('tags', $event)"></ChipsFilter>
    </div>
</template>

<style scoped>

.search {
    width: calc(100% - 8px);
    margin-bottom: 21px;
}

</style>