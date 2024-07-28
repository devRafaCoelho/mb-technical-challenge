<template>
  <div id="app">
    <StepOne v-if="step === 1" @next="goToStep(2)" :formData="formData" />
    <StepTwo v-if="step === 2" @prev="goToStep(1)" @next="goToStep(3)" :formData="formData"
      :registrationType="formData.registrationType" />
    <StepThree v-if="step === 3" @prev="goToStep(2)" @next="goToStep(4)" :formData="formData" />
    <StepFour v-if="step === 4" @prev="goToStep(3)" @submit="handleFormSubmit" :formData="formData" />
  </div>
</template>

<script>
import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';
import StepFour from './components/StepFour.vue';

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour
  },
  data() {
    return {
      step: 1,
      formData: {
        email: '',
        registrationType: '',
        name: '',
        cpf: '',
        birthDate: '',
        cpfPhone: '',
        companyName: '',
        cnpj: '',
        openingDate: '',
        cnpjPhone: '',
        password: ''
      }
    };
  },
  methods: {
    goToStep(step) {
      this.step = step;
    },
    handleFormSubmit(response) {
      console.log(response);
    }
  }
};
</script>
