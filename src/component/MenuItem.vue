<template>
    <div class="menu-item">
        <slot />
    </div>
</template>

<style scoped>

.menu-item {
    background-color: var(--bg);
    display: flex;
    width: fit-content;
    height: fit-content;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
    padding: 8px;
    border-radius: 8px;
    border: #E5E7EB solid 1px;
}
</style>