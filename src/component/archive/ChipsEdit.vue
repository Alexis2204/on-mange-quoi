<script>
import Chip from './Chip.vue';


export default {
    data() {
        return {
            newTag: ""
        }
    },
    props: {
        modelValue: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:modelValue'],
    components: {
        Chip
    },
    methods: {
        addTag() {
            if (this.newTag != "") {
                let newTags = [...this.modelValue];
                newTags.push(this.newTag);
                this.newTag = "";
                this.$emit('update:modelValue', newTags);
            }
        },
        deleteTag(tag) {
            let newTags = [...this.modelValue];
            newTags = newTags.filter(t => t !== tag);
            this.$emit('update:modelValue', newTags);
        }
    }
}

</script>

<template>
    <div class="chips-edit">
        <Chip v-for="tag in modelValue" :name="tag" :key="tag" :delete="true" @delete="deleteTag(tag)"></Chip>
        <form @submit.prevent="addTag">
          <input 
            v-model="newTag"
            type="text"
            placeholder="Ajouter un tag..."
            enterkeyhint="done"
          />
        </form>
    </div>
</template>

<style scoped>
.chips-edit {
    display: flex;
    gap: 8px;
    font-size: small;
    flex-wrap: wrap;
}
</style>