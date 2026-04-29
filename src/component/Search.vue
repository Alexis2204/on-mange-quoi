<script>
import ChipsFilter from './ChipsFilter.vue';
import DifficultyFilter from './DifficultyFilter.vue';
import DurationFilter from './DurationFilter.vue';
import SearchBar from './SearchBar.vue';
import SortBy from './SortBy.vue';


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
        ChipsFilter,
        DifficultyFilter,
        DurationFilter,
        SortBy
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
        <div class="info">
            Trié par
        </div>
        <SortBy 
          :sortBy="modelValue.sortBy"
          :orderBy="modelValue.orderBy"
          @update:sortBy="update('sortBy', $event)"
          @update:orderBy="update('orderBy', $event)"
        />
        <div class="info">
            Durée
        </div>
        <DurationFilter
          :durations="modelValue.durations"
          @update:durations="update('durations', $event)"
        />
        <div class="info">
            Difficulté
        </div>
        <DifficultyFilter 
            :difficulties="modelValue.difficulties"
            @update:difficulties="update('difficulties', $event)">
        </DifficultyFilter>
        <div class="info">
            Tags
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