<template>
    <div class="main-container">
        <StepTitle stepNumber="3" text="Senha de Acesso" />
        <form @submit.prevent="validateStepThree">
            <InputField label="Senha" id="password" type="password" v-model="formData.password"
                :errorMessage="errors.password" @input="validateInput('password')" />

            <div class="button-wrapper">
                <CustomButton variant="outlined" text="Voltar" width="50%" @click="$emit('prev')" type="button" />
                <CustomButton text="Continuar" width="50%" type="submit" />
            </div>
        </form>
    </div>
</template>

<script>
import CustomButton from './CustomButton.vue';
import InputField from './InputField.vue';
import StepTitle from './StepTitle.vue';

export default {
    components: {
        StepTitle,
        InputField,
        CustomButton
    },
    props: ['formData'],
    data() {
        return {
            errors: {
                password: ''
            }
        };
    },
    methods: {
        validateInput(field) {
            if (field === 'password') {
                const password = this.formData.password;
                if (!password) {
                    this.errors.password = 'A Senha é obrigatória';
                } else if (!/^.{5,}$/.test(password)) {
                    this.errors.password = 'A Senha deve conter no mínimo 5 caracteres';
                } else {
                    this.errors.password = '';
                }
            }
        },
        validateStepThree() {
            this.validateInput('password');
            if (!this.errors.password) {
                this.$emit('next');
            }
        }
    }
};
</script>
