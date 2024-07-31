<template>
  <div class="radio-input-container">
    <input
      type="radio"
      :id="id"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', $event.target.value)"
      class="radio-input"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "RadioInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.radio-input-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.radio-input {
  all: unset;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 2px solid #ef4723;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.radio-input::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.2s;
}

.radio-input:checked::before {
  background-color: #ef4723;
}
</style>
