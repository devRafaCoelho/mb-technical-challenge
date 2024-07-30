<template>
    <div class="input-container">
        <label :for="id" class="label-input">{{ label }}</label>
        <input :type="type" :id="id" :value="modelValue" @input="onInput" class="input-text" />
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
.input-container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
}

.label-input {
    font-weight: 600;
}

.input-text {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    min-height: 48px;
    padding: 5px 10px;
    border: 1px solid #1d2327;
    border-radius: 5px;
    color: #1d2327;
}

.error-message {
    color: red;
    font-size: 12px;
    font-weight: 500;
}
</style>
