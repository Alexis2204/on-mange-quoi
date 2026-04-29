<script>
export default {
  props: {
    sortBy: {
      type: String,
      default: ""
    },
    orderBy: {
      type: String,
      default: "asc"
    }
  },
  emits: ['update:sortBy', 'update:orderBy'],
  data() {
    return {
      options: [
        { label: "Nom", value: "name" },
        { label: "Dernière fois", value: "lastEatenAt" },
        { label: "Durée", value: "duration" },
        { label: "Difficulté", value: "difficulty" }
      ]
    }
  },
  methods: {
    selectSort(value) {
      this.$emit('update:sortBy', value);
    },
    toggleOrder() {
      const newOrder = this.orderBy === "asc" ? "desc" : "asc";
      this.$emit('update:orderBy', newOrder);
    }
  }
}
</script>

<template>
  <div class="sort-by">
    <!-- Order toggle -->
    <div class="order" @click="toggleOrder">
      {{ orderBy === "asc" ? "⬆️ Croissant" : "⬇️ Décroissant" }}
    </div>
    
    <!-- Sort options -->
    <div class="sort-options">
      <div
        v-for="opt in options"
        :key="opt.value"
        class="chip"
        :class="{ selected: sortBy === opt.value }"
        @click="selectSort(opt.value)"
      >
        {{ opt.label }}
      </div>
    </div>


  </div>
</template>

<style scoped>
.sort-by {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sort-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  border: 1px solid var(--text-color);
  border-radius: 32px;
  padding: 4px 10px;
  font-size: small;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:active {
  transform: scale(0.95);
}

.selected {
  background-color: var(--text-color);
  color: white;
}

.order {
  font-size: small;
  cursor: pointer;
  opacity: 0.7;
}
</style>