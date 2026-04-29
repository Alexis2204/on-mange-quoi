<script>
import Card from '@/component/Card.vue';
import CardView from './CardView.vue';
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import IconExplorer from '@/icon/IconExplorer.vue';
import Menu from '@/component/Menu.vue';
import Search from '@/component/Search.vue';

import { initMenu, openMenuAnimation, closeMenuAnimation } from '@/library/animation';
import { getUserMeals, addMealsBatchForUser } from '@/library/bdd';
import { auth } from '../../firebaseApp';
import { isVisible, sortMeals } from '@/library/utils';

gsap.registerPlugin(Flip)

export default {
    data() {
        return {
            selectedMeal: null,
            meals: [],
            search: {
              query: "",
              tags: [],
              difficulties: [],
              durations: [],
              sortBy: "name",
              orderBy: "asc"
            }
        }
    },
    components: {
        Card,
        CardView,
        IconExplorer,
        Menu,
        Search
    },
    methods: {
        async openCard(meal) {
            this.selectedMeal = meal
            await this.$nextTick()

            const state = Flip.getState(`[data-flip-id="card-${meal.id}"]`)
            Flip.from(state, {
                duration: 0.4,
                ease: 'power3.inOut',
                absolute: true,
                scale: true,
            })

            gsap.from('.card-view', {
                opacity: 0,
                duration: 0.4
            })
        },

        async closeCard(refresh) {
            if (refresh) {
                this.meals = await getUserMeals(auth.currentUser?.uid);
            }
            const state = Flip.getState(`[data-flip-id="card-${this.selectedMeal.id}"]`)

            this.selectedMeal = null

            await this.$nextTick()

            Flip.from(state, {
                duration: 0.7,
                ease: 'power3.inOut',
                absolute: true,
                zIndex: 9
            })
        },

        openMenu() {
            openMenuAnimation(
                this.$refs.menu.$el,
                this.$refs.explorerBtn
            );
        },

        closeMenu() {
            closeMenuAnimation(
                this.$refs.menu.$el,
                this.$refs.explorerBtn
            );
        }
    },
    computed: {
      filteredMeals() {
        let visibleMeals = this.meals.filter(meal =>
          isVisible(meal, this.search)
        );

        return sortMeals(visibleMeals, this.search);
      },
      tags() {
        return [...new Set(
              this.meals.flatMap(meal => meal.tags ?? [])
            )];
      }
    },
    async created() {
        try {
            this.meals = await getUserMeals(auth.currentUser?.uid);
        } catch (e) {
            console.error(e);
        }
    },
    mounted() {
        initMenu(this.$refs.menu.$el);
    },
}
</script>

<template>
    <div class="home-view">
        <h1>On Mange <span class="quoi">Quoi ?</span></h1>

        <Search v-model="search" :tags="tags"></Search>

        <div class="cards">
            <Card v-if="filteredMeals.length != 0" v-for="meal in filteredMeals" :key="meal.id" :id="meal.id" :meal="meal"
                @select="(e) => openCard(meal, e)" />
        </div>

        <CardView v-if="selectedMeal" :meal="selectedMeal" @close="(refresh) => closeCard(refresh)" />

        <button ref="explorerBtn" class="explorer" @click="openMenu">
            <IconExplorer :height="29"></IconExplorer>
            <span>Explorer</span>
        </button>

        <Menu ref="menu" @close="closeMenu">
        </Menu>
    </div>
</template>


<style scoped>
.home-view {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cards {
    display: flex;
    gap: 8px;
    width: calc(100vw - 16px);
    flex-wrap: wrap;
}

.explorer {
    position: fixed;
    bottom: 16px;
    z-index: 9;
}
</style>