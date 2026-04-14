<script>
import Card from '@/component/Card.vue';
export default {

    components: {
        Card
    }
}
</script>

<template>
    <div class="home-view">
        <h1>On Mange <span class="quoi">Quoi ?</span></h1>
        <div class="cards">
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </div>
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
</style>