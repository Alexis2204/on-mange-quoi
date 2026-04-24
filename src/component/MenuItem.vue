<template>
    <div class="menu-item">
        <slot />
    </div>
</template>

<style scoped>

.menu-item {
    background-color: var(--text-color-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
    padding: 8px;
    border-radius: 13px;
    border: #E5E7EB solid 1px;
    height: scretch;
    width: 40px;
}
</style>