<script>
import IconSearch from '@/icon/IconSearch.vue';
export default {
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    emits: ['update:query'],
    components: {
        IconSearch
    },
}
</script>

<template>
    <div class="search-bar">
        <input class="search-input" type="text" :value="query" @input="$emit('update:query', $event.target.value)"
            placeholder="Rechercher...">
        <IconSearch></IconSearch>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: x-large;
    
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04),
                0 10px 20px rgba(124, 58, 237, 0.08);
    padding: 8px;
    width: calc(100% - 18px);
    border-radius: 32px;
    border: var(--text-color) solid 1px;
}

.search-input {
    width: 100%;
    padding: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
}
</style>