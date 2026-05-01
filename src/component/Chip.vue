<script>
export default {
    props: {
        name: String,
        state: {
            type: String,
            default: "neutral"
        }
    },
    emits: ["click"]
}
</script>

<template>
    <div class="chip" :class="state" @click="$emit('click')">
        {{ name }}
    </div>
</template>

<style scoped>
.chip {
    border: 1px solid var(--text-color);
    border-radius: 32px;
    padding: 4px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    gap: 4px;
}

.chip.include {
    background-color: var(--text-color);
    color: white;
}

.chip.exclude {
    color: white;
    background-color: #c90530; /* rouge rosé / moderne */
    border-color: #c90530;
}


</style>