<script>
import Dice1 from '@/icon/dice/Dice1.vue';
import Dice2 from '@/icon/dice/Dice2.vue';
import Dice3 from '@/icon/dice/Dice3.vue';
import Dice4 from '@/icon/dice/Dice4.vue';
import Dice5 from '@/icon/dice/Dice5.vue';
import Dice6 from '@/icon/dice/Dice6.vue';

export default {
  props: {
    size: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      icons: [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6],
      currentIndex: 0
    }
  },
  computed: {
    currentIcon() {
      return this.icons[this.currentIndex];
    }
  },
  methods: {
    roll() {
      this.currentIndex = Math.floor(Math.random() * this.icons.length);
    }
  },
  mounted() {
    this.roll(); // 🎲 au premier affichage
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