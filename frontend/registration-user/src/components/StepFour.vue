<template>
  <div class="main-container">
    <StepTitle stepNumber="4" text="Revise suas Informações" />

    <TextField
      label="Endereço de e-mail"
      id="email"
      type="text"
      :modelValue="formData.email"
      :errorMessage="''"
      :disabled="true"
    />

    <div v-if="formData.registrationType === 'PF'">
      <TextField
        label="Nome"
        id="name"
        type="text"
        :modelValue="formData.name"
        :errorMessage="''"
        :disabled="true"
      />
      <TextField
        label="CPF"
        id="cpf"
        type="text"
        :modelValue="formData.cpf"
        :errorMessage="''"
        :disabled="true"
      />
      <TextField
        label="Data de Nascimento"
        id="birthDate"
        type="date"
        :modelValue="formData.birthDate"
        :errorMessage="''"
        :disabled="true"
      />
      <TextField
        label="Telefone"
        id="cpfPhone"
        type="text"
        :modelValue="formData.cpfPhone"
        :errorMessage="''"
        :disabled="true"
      />
    </div>

    <div v-else>
      <TextField
        label="Razão Social"
        id="companyName"
        type="text"
        :modelValue="formData.companyName"
        :errorMessage="''"
        :disabled="true"
      />
      <TextField
        label="CNPJ"
        id="cnpj"
        type="text"
        :modelValue="formData.cnpj"
        :errorMessage="''"
        :disabled="true"
      />
      <TextField
        label="Data de Abertura"
        id="openingDate"
        type="date"
        :modelValue="formData.openingDate"
        :errorMessage="''"
        :disabled="true"
      />
      <TextField
        label="Telefone"
        id="cnpjPhone"
        type="text"
        :modelValue="formData.cnpjPhone"
        :errorMessage="''"
        :disabled="true"
      />
    </div>

    <TextField
      label="Senha"
      id="password"
      type="text"
      :modelValue="formData.password"
      :errorMessage="''"
      :disabled="true"
    />

    <div class="button-wrapper">
      <CustomButton
        variant="outlined"
        text="Voltar"
        width="50%"
        @click="$emit('prev')"
      />
      <CustomButton text="Cadastrar" width="50%" @click="submitForm" />
    </div>
  </div>
</template>

<script>
import { registrationUser } from "@/services/api";
import StepTitle from "./StepTitle.vue";
import TextField from "./TextField.vue";
import CustomButton from "./CustomButton.vue";

export default {
  components: {
    StepTitle,
    TextField,
    CustomButton,
  },
  props: ["formData"],
  methods: {
    async submitForm() {
      const fieldsToClean = ["cpf", "cnpj", "cpfPhone", "cnpjPhone"];

      fieldsToClean.forEach((field) => {
        if (this.formData[field]) {
          this.formData[field] = this.formData[field].replace(/\D/g, "");
        }
      });

      try {
        const response = await registrationUser(this.formData);
        this.$emit("submit", response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
