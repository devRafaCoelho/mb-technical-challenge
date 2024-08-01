<template>
  <div class="input-container">
    <label :for="id" class="label-input">{{ label }}</label>
    <div v-if="isPasswordField" class="password-container">
      <input
        :type="inputType"
        :id="id"
        :value="modelValue"
        @input="onInput"
        class="input-text"
        :class="{ 'input-disabled': disabled }"
        :disabled="disabled"
      />
      <span @click="toggleVisibility" class="password-toggle-icon">
        <i :class="iconClass"></i>
      </span>
    </div>
    <div v-else class="wrapper-input">
      <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="onInput"
        class="input-text"
        :class="{ 'input-disabled': disabled }"
        :disabled="disabled"
      />
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "TextField",
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
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    isPasswordField() {
      return this.type === "password";
    },
    inputType() {
      return this.isPasswordField && this.showPassword ? "text" : this.type;
    },
    iconClass() {
      return this.showPassword ? "fa fa-eye-slash" : "fa fa-eye";
    },
  },
  methods: {
    onInput(event) {
      if (!this.disabled) {
        this.$emit("update:modelValue", event.target.value);
      }
    },
    toggleVisibility() {
      if (this.isPasswordField) {
        this.showPassword = !this.showPassword;
      }
    },
  },
};
</script>

<style scoped>
.password-container {
  position: relative;
  width: 100%;
}

.password-toggle-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
  transform: translateY(-50%);
}

.password-toggle-icon i {
  font-size: 14px;
  color: #1d2327;
}

.wrapper-input {
  width: 100%;
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

.input-text:focus {
  border: 2px solid #ef4723;
}

.input-text:not(.input-disabled):hover {
  border-color: #ef4723;
}

.input-disabled {
  background-color: #d1cfcf;
}

.error-message {
  color: red;
  font-size: 12px;
  font-weight: 500;
}

.password-container .input-text {
  padding-right: 40px;
}
</style>
