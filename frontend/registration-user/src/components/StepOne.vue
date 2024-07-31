<template>
  <div class="main-container">
    <StepTitle stepNumber="1" text="Seja bem vindo(a)" />
    <form @submit.prevent="validateStepOne">
      <TextField
        label="Endereço de e-mail"
        id="email"
        type="text"
        v-model="formData.email"
        :errorMessage="errors.email"
        @input="validateInput('email')"
      />
      <div class="input-container">
        <label class="label-input">Tipo de Cadastro:</label>
        <div class="radio-wrapper">
          <RadioInput
            id="pf"
            value="PF"
            v-model="formData.registrationType"
            label="Pessoa Física"
          />
          <RadioInput
            id="pj"
            value="PJ"
            v-model="formData.registrationType"
            label="Pessoa Jurídica"
          />
        </div>
      </div>
      <CustomButton text="Continuar" type="submit" />
    </form>
  </div>
</template>

<script>
import TextField from "./TextField.vue";
import StepTitle from "./StepTitle.vue";
import RadioInput from "./RadioInput.vue";
import CustomButton from "./CustomButton.vue";

export default {
  components: {
    StepTitle,
    TextField,
    RadioInput,
    CustomButton,
  },
  props: ["formData"],
  data() {
    return {
      errors: {
        email: "",
      },
    };
  },
  methods: {
    validateInput(field) {
      if (field === "email") {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const email = this.formData.email.trim();

        if (!email) {
          this.errors.email = "O E-mail é obrigatório";
        } else if (!emailRegex.test(email)) {
          this.errors.email = "E-mail inválido";
        } else {
          this.errors.email = "";
        }
      }
    },
    validateStepOne() {
      this.validateInput("email");
      if (!this.errors.email) {
        this.$emit("next");
      }
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        if (!newVal.registrationType) {
          newVal.registrationType = "PF";
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (!this.formData.registrationType) {
      this.formData.registrationType = "PF";
    }
  },
};
</script>

<style>
.radio-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
</style>
