<template>
    <div class="main-container">
        <StepTitle stepNumber="1" text="Seja bem vindo(a)" />
        <form @submit.prevent="validateStepOne">
            <InputField label="E-mail" id="email" type="text" v-model="formData.email" :errorMessage="errors.email"
                @input="validateInput('email')" />
            <div class="input-container">
                <label class="label-input">Tipo de Cadastro:</label>
                <div class="radio-wrapper">
                    <InputRadio id="pf" value="PF" v-model:modelValue="formData.registrationType"
                        label="Pessoa Física" />
                    <InputRadio id="pj" value="PJ" v-model:modelValue="formData.registrationType"
                        label="Pessoa Jurídica" />
                </div>
            </div>
            <CustomButton text="Continuar" @click="validateStepOne" />
        </form>
    </div>
</template>

<script>
import InputField from './InputField.vue';
import StepTitle from './StepTitle.vue';
import InputRadio from './InputRadio.vue';
import CustomButton from './CustomButton.vue';

export default {
    components: {
        StepTitle,
        InputField,
        InputRadio,
        CustomButton
    },
    props: ['formData'],
    data() {
        return {
            errors: {
                email: ''
            }
        };
    },
    methods: {
        validateInput(field) {
            if (field === 'email') {
                const email = this.formData.email.trim();
                if (!email) {
                    this.errors.email = 'O E-mail é obrigatório';
                } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                    this.errors.email = 'E-mail inválido';
                } else {
                    this.errors.email = '';
                }
            }
        },
        validateStepOne() {
            this.validateInput('email');
            if (!this.errors.email) {
                this.$emit('next');
            }
        }
    },
    watch: {
        formData: {
            handler(newVal) {
                if (!newVal.registrationType) {
                    newVal.registrationType = 'PF';
                }
            },
            deep: true
        }
    },
    mounted() {
        if (!this.formData.registrationType) {
            this.formData.registrationType = 'PF';
        }
    }
};
</script>

<style>
.radio-wrapper {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.contained-button {
    width: 100%;
}
</style>