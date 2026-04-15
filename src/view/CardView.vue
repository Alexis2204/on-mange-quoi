<script>
export default {
    name: 'CardView',
    props: {
        id: Number
    },
    emits: ['close']
}
</script>

<template>
    <div class="card-view" @click="$emit('close')">
        <div class="card" :data-flip-id="'card-' + id">
            <div class="content">
                <h2>Quiche Lorraine</h2>
                <p>Recette détaillée ici 👨‍🍳</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-view {
    position: fixed;
    inset: 0;
    background: white;
    z-index: 100;
    display: flex;
}

.card {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
    padding: 8px;
    border: #E5E7EB solid 1px;
}

.card::after {
    content: "";
    position: absolute;

    top: -620px;
    left: -115px;

    width: 668px;
    height: 693px;

    background: url('@/icon/Blob.svg') no-repeat;
    background-size: contain;

    z-index: 0;
}

.content {
    position: absolute;
    z-index: 1;
    left: 8px;
    top: 64px;
    overflow-wrap: anywhere;
}
</style>