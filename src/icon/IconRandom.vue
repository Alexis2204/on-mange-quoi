<script>
import Dice1 from '@/icon/dice/Dice1.vue';
import Dice2 from '@/icon/dice/Dice2.vue';
import Dice3 from '@/icon/dice/Dice3.vue';
import Dice4 from '@/icon/dice/Dice4.vue';
import Dice5 from '@/icon/dice/Dice5.vue';
import Dice6 from '@/icon/dice/Dice6.vue';
import { markRaw } from 'vue';
const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export default {
  data() {
    return {
      // icons: [ markRaw(Dice1), markRaw(Dice2), markRaw(Dice3), markRaw(Dice4), markRaw(Dice5), markRaw(Dice6)],
      currentIndex: 0
    }
  },
  emits: ['roll'],
  computed: {
    currentIcon() {
      return icons[this.currentIndex];
    }
  },
  methods: {
    roll(emit) {
      let count = 0;
      const interval = setInterval(() => {
        this.currentIndex = Math.floor(Math.random() * icons.length);
        count++;
      
        if (count > 5) {
          clearInterval(interval);
          if (emit) {
            this.$emit("roll");
          }
        }
      }, 90);
    }
  },
  mounted() {
    this.roll(false); // 🎲 au premier affichage
  }
}
</script>

<template>
  <component 
    :is="currentIcon"
    @click="roll"
    style="cursor: pointer;"
  />
</template>