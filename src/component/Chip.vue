<script>
import IconDelete from '@/icon/IconDelete.vue';



export default {
    props: {
        name: String,
        delete: {
            type: Boolean,
            default: false
        }
    },
    emits: ['delete'],
    components: {
        IconDelete
    }
}
</script>

<template>
    <div class="chip">
        {{ name }}
        <IconDelete v-if="delete" @click="$emit('delete')"></IconDelete>
    </div>
</template>

<style scoped>
.chip {
    border: 1px solid var(--text-color);
    border-radius: 32px;
    color: var(--text-color);
    padding: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    gap: 4px;

}
</style>