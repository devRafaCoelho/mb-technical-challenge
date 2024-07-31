<template>
  <div class="main-container">
    <StepTitle stepNumber="2" :text="stepTitleText" />
    <form @submit.prevent="validateStepTwo">
      <div v-if="formData.registrationType === 'PF'">
        <InputField
          label="Nome"
          id="name"
          type="text"
          v-model="formData.name"
          :errorMessage="errors.name"
          @input="validateInput('name', 'letters')"
        />

        <InputField
          label="CPF"
          id="cpf"
          type="text"
          v-model="formData.cpf"
          :errorMessage="errors.cpf"
          @input="validateInput('cpf', 'numbers', 11)"
        />

        <InputField
          label="Data de Nascimento"
          id="birthDate"
          type="date"
          v-model="formData.birthDate"
          :errorMessage="errors.birthDate"
          @input="validateInput('birthDate')"
        />

        <InputField
          label="Número de Telefone"
          id="cpfPhone"
          type="text"
          v-model="formData.cpfPhone"
          :errorMessage="errors.cpfPhone"
          @input="validateInput('cpfPhone', 'numbers', 11)"
        />
      </div>
      <div v-if="formData.registrationType === 'PJ'">
        <InputField
          label="Razão Social"
          id="companyName"
          type="text"
          v-model="formData.companyName"
          :errorMessage="errors.companyName"
          @input="validateInput('companyName', 'letters')"
        />

        <InputField
          label="CNPJ"
          id="cnpj"
          type="text"
          v-model="formData.cnpj"
          :errorMessage="errors.cnpj"
          @input="validateInput('cnpj', 'numbers', 14)"
        />

        <InputField
          label="Data de Abertura"
          id="openingDate"
          type="date"
          v-model="formData.openingDate"
          :errorMessage="errors.openingDate"
          @input="validateInput('openingDate')"
        />

        <InputField
          label="Número de Telefone"
          id="cnpjPhone"
          type="text"
          v-model="formData.cnpjPhone"
          :errorMessage="errors.cnpjPhone"
          @input="validateInput('cnpjPhone', 'numbers', 11)"
        />
      </div>
      <div class="button-wrapper">
        <CustomButton
          variant="outlined"
          text="Voltar"
          width="50%"
          @click="$emit('prev')"
          type="button"
        />
        <CustomButton text="Continuar" width="50%" type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import CustomButton from "./CustomButton.vue";
import InputField from "./InputField.vue";
import StepTitle from "./StepTitle.vue";

export default {
  components: {
    StepTitle,
    InputField,
    CustomButton,
  },
  props: ["formData"],
  data() {
    return {
      errors: {
        name: "",
        cpf: "",
        birthDate: "",
        cpfPhone: "",
        companyName: "",
        cnpj: "",
        openingDate: "",
        cnpjPhone: "",
      },
    };
  },
  computed: {
    stepTitleText() {
      return this.formData.registrationType === "PF"
        ? "Pessoa Física"
        : "Pessoa Jurídica";
    },
  },
  methods: {
    validateInput(field, type = "", maxLength = 0) {
      if (type === "letters") {
        this.formData[field] = this.formData[field].replace(/[^a-zA-Z\s]/g, "");
      } else if (type === "numbers") {
        this.formData[field] = this.formData[field]
          .replace(/[^0-9]/g, "")
          .slice(0, maxLength);

        if (field === "cpf") {
          this.formData[field] = this.formData[field].replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
          );
        }

        if (field === "cnpj") {
          this.formData[field] = this.formData[field].replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
            "\$1.\$2.\$3\/\$4\-\$5"
          );
        }

        if (field === "cpfPhone" || field === "cnpjPhone") {
          this.formData[field] = this.formData[field].replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
          );
        }
      }

      this.errors[field] = this.getErrorMessage(field);
    },
    getErrorMessage(field) {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
      let error = "";

      if (this.formData.registrationType === "PF") {
        switch (field) {
          case "name":
            if (!this.formData.name) {
              error = "O Nome é obrigatório";
            }
            break;
          case "cpf":
            if (!this.formData.cpf) {
              error = "O CPF é obrigatório";
            } else if (!cpfRegex.test(this.formData.cpf)) {
              error = "CPF inválido";
            }
            break;
          case "birthDate":
            if (!this.formData.birthDate) {
              error = "A Data de Nascimento é obrigatória";
            } else if (isNaN(new Date(this.formData.birthDate).getTime())) {
              error = "Data de nascimento inválida";
            }
            break;
          case "cpfPhone":
            if (!this.formData.cpfPhone) {
              error = "O Telefone é obrigatório";
            } else if (!phoneRegex.test(this.formData.cpfPhone)) {
              error = "Telefone inválido";
            }
            break;
        }
      } else if (this.formData.registrationType === "PJ") {
        switch (field) {
          case "companyName":
            if (!this.formData.companyName) {
              error = "A Razão Social é obrigatória";
            }
            break;
          case "cnpj":
            if (!this.formData.cnpj) {
              error = "O CNPJ é obrigatório";
            } else if (!cnpjRegex.test(this.formData.cnpj)) {
              error = "CNPJ inválido";
            }
            break;
          case "openingDate":
            if (!this.formData.openingDate) {
              error = "A Data de Abertura é obrigatória";
            } else if (isNaN(new Date(this.formData.openingDate).getTime())) {
              error = "Data de Abertura inválida";
            }
            break;
          case "cnpjPhone":
            if (!this.formData.cnpjPhone) {
              error = "O Telefone é obrigatório";
            } else if (!phoneRegex.test(this.formData.cnpjPhone)) {
              error = "Telefone inválido";
            }
            break;
        }
      }

      return error;
    },
    validateStepTwo() {
      let valid = true;

      this.errors = {
        name: "",
        cpf: "",
        birthDate: "",
        cpfPhone: "",
        companyName: "",
        cnpj: "",
        openingDate: "",
        cnpjPhone: "",
      };

      [
        "name",
        "cpf",
        "birthDate",
        "cpfPhone",
        "companyName",
        "cnpj",
        "openingDate",
        "cnpjPhone",
      ].forEach((field) => {
        const errorMessage = this.getErrorMessage(field);
        if (errorMessage) {
          this.errors[field] = errorMessage;
          valid = false;
        }
      });

      if (valid) {
        this.$emit("next");
      }
    },
  },
};
</script>
