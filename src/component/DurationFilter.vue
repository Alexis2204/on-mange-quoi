<script>
export default {
  props: {
    durations: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:durations'],
  data() {
    return {
      ranges: [
        { label: "< 15 min", value: "lt15" },
        { label: "15 - 30 min", value: "15-30" },
        { label: "30 - 60 min", value: "30-60" },
        { label: "> 1h", value: "gt60" }
      ]
    }
  },
  methods: {
    toggleDuration(range) {
      let newDurations = [...this.durations];

      if (newDurations.includes(range)) {
        newDurations = newDurations.filter(r => r !== range);
      } else {
        newDurations.push(range);
      }

      this.$emit('update:durations', newDurations);
    },
    isSelected(range) {
      return this.durations.includes(range);
    }
  }
}
</script>

<template>
  <div class="duration-filter">
    <div
      v-for="range in ranges"
      :key="range.value"
      class="duration-chip"
      :class="{ selected: isSelected(range.value) }"
      @click="toggleDuration(range.value)"
    >
      {{ range.label }}
    </div>
  </div>
</template>

<style scoped>
.duration-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.duration-chip {
  border: 1px solid var(--text-color);
  border-radius: 32px;
  padding: 4px 10px;
  font-size: small;
  cursor: pointer;
  transition: all 0.2s ease;
}

.duration-chip:active {
  transform: scale(0.95);
}

.selected {
  background-color: var(--text-color);
  color: white;
}
</style>