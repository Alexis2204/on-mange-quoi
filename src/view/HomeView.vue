<script>
import Card from '@/component/Card.vue';
import CardView from './CardView.vue';
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import IconExplorer from '@/icon/IconExplorer.vue';
import Menu from '@/component/Menu.vue';

import { initMenu, openMenuAnimation, closeMenuAnimation } from '@/library/animation';

gsap.registerPlugin(Flip)

export default {
    data() {
        return {
            selectedId: null
        }
    },
    components: {
        Card,
        CardView,
        IconExplorer,
        Menu
    },
    methods: {
        async openCard(id) {
            this.selectedId = id
            await this.$nextTick()
            
            const state = Flip.getState(`[data-flip-id="card-${id}"]`)
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

        async closeCard() {
            const state = Flip.getState(`[data-flip-id="card-${this.selectedId}"]`)

            this.selectedId = null

            await this.$nextTick()

            Flip.from(state, {
                duration: 0.7,
                ease: 'power3.inOut',
                absolute: true
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
    mounted() {
        initMenu(this.$refs.menu.$el);
    },
}
</script>

<template>
    <div class="home-view">
        <h1>On Mange <span class="quoi">Quoi ?</span></h1>

        <div class="cards">
            <Card 
              v-for="i in 10"
              :key="i"
              :id="i"
              @select="(e) => openCard(i, e)"
            />
        </div>

        <CardView
            v-if="selectedId" 
            :id="selectedId" 
            @close="closeCard"
        />

        <button 
            ref="explorerBtn"
            class="explorer"
            @click="openMenu">
            <IconExplorer></IconExplorer>
            <span>Explorer</span>
        </button>

        <Menu
            ref="menu"
            @close="closeMenu">
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