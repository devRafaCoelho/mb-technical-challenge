<template>
    <div>
        <label :for="id">{{ label }}</label>
        <input :type="type" :id="id" :value="modelValue" @input="onInput" />
        <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            required: true,
        },
        errorMessage: {
            type: String,
            default: '',
        }
    },
    methods: {
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
};
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 12px;
}
</style>