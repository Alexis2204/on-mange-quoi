<script>
import ChipsFilter from './ChipsFilter.vue';
import DifficultyFilter from './DifficultyFilter.vue';
import DurationFilter from './DurationFilter.vue';
import SearchBar from './SearchBar.vue';
import SortBy from './SortBy.vue';


export default {
    data() {
      return {
        showAdvanced: false
      }
    },
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
      },
      updateTags({ includeTags, excludeTags }) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          includeTags,
          excludeTags
        });
      },
      toggleAdvanced() {
        this.showAdvanced = !this.showAdvanced;
      }
    }
}
</script>

<template>
    <div class="search">
        <SearchBar :query="modelValue.query" @update:query="update('query', $event)"></SearchBar>
        <div class="info clickable" @click="toggleAdvanced">
          Recherche avancée
          <span class="arrow">{{ showAdvanced ? "▲" : "▼" }}</span>
        </div>
        <div class="advanced" :class="{ open: showAdvanced }">
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
          <ChipsFilter
            :includeTags="modelValue.includeTags"
            :excludeTags="modelValue.excludeTags"
            :allTags="tags"
            @update="updateTags"
          />
        </div>
    </div>
</template>

<style scoped>

.search {
    width: calc(100% - 8px);
    margin-bottom: 21px;
}

.clickable {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 4px;
}

.arrow {
  font-size: 12px;
}

/* 🔥 magie ici */
.advanced {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.4s ease;
}

/* ouvert */
.advanced.open {
  max-height: 500px; /* assez grand */
  opacity: 1;
  transform: translateY(0);
}
</style>