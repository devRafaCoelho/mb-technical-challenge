<template>
  <div class="main-container">
    <StepTitle stepNumber="4" text="Revise suas Informações" />

    <InputField
      label="Endereço de e-mail"
      id="email"
      type="text"
      :modelValue="formData.email"
      :errorMessage="''"
      :disabled="true"
    />

    <div v-if="formData.registrationType === 'PF'">
      <InputField
        label="Nome"
        id="name"
        type="text"
        :modelValue="formData.name"
        :errorMessage="''"
        :disabled="true"
      />
      <InputField
        label="CPF"
        id="cpf"
        type="text"
        :modelValue="formData.cpf"
        :errorMessage="''"
        :disabled="true"
      />
      <InputField
        label="Data de Nascimento"
        id="birthDate"
        type="text"
        :modelValue="formData.birthDate"
        :errorMessage="''"
        :disabled="true"
      />
      <InputField
        label="Telefone"
        id="cpfPhone"
        type="text"
        :modelValue="formData.cpfPhone"
        :errorMessage="''"
        :disabled="true"
      />
    </div>

    <div v-else>
      <InputField
        label="Razão Social"
        id="companyName"
        type="text"
        :modelValue="formData.companyName"
        :errorMessage="''"
        :disabled="true"
      />
      <InputField
        label="CNPJ"
        id="cnpj"
        type="text"
        :modelValue="formData.cnpj"
        :errorMessage="''"
        :disabled="true"
      />
      <InputField
        label="Data de Abertura"
        id="openingDate"
        type="text"
        :modelValue="formData.openingDate"
        :errorMessage="''"
        :disabled="true"
      />
      <InputField
        label="Telefone"
        id="cnpjPhone"
        type="text"
        :modelValue="formData.cnpjPhone"
        :errorMessage="''"
        :disabled="true"
      />
    </div>

    <InputField
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
import InputField from "./InputField.vue";
import CustomButton from "./CustomButton.vue";

export default {
  components: {
    StepTitle,
    InputField,
    CustomButton,
  },
  props: ["formData"],
  methods: {
    async submitForm() {
      if (this.formData.cpf) {
        this.formData.cpf = this.formData.cpf.replace(/\D/g, "");
      }

      if (this.formData.cnpj) {
        this.formData.cnpj = this.formData.cnpj.replace(/\D/g, "");
      }

      if (this.formData.cpfPhone) {
        this.formData.cpfPhone = this.formData.cpfPhone.replace(/\D/g, "");
      }

      if (this.formData.cnpjPhone) {
        this.formData.cnpjPhone = this.formData.cnpjPhone.replace(/\D/g, "");
      }

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
