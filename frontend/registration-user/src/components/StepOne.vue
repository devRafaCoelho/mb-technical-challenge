<template>
    <div class="main-container">
        <h4 class="step-title">Etapa <span class="step-number">1</span> de 4</h4>
        <h1 class="welcome-text">Seja bem vindo(a)</h1>
        <form @submit.prevent="validateStepOne">
            <InputField label="E-mail" id="email" type="text" v-model="formData.email" :errorMessage="errors.email"
                @input="validateInput('email')" />
            <div class="input-container">
                <label class="label-input">Tipo de Cadastro:</label>
                <div class="radio-input-container">
                    <input type="radio" id="pf" value="PF" v-model="formData.registrationType" />
                    <label for="pf">Pessoa Física</label>
                </div>
                <div class="radio-input-container">
                    <input type="radio" id="pj" value="PJ" v-model="formData.registrationType" />
                    <label for="pj">Pessoa Jurídica</label>
                </div>
            </div>
            <button class="contained-button" type="submit">Continuar</button>
        </form>
    </div>
</template>

<script>
import InputField from './InputField.vue';

export default {
    components: {
        InputField
    },
    props: ['formData'],
    data() {
        return {
            errors: {
                email: '',
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
        },
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
.radio-input-container {
    display: flex;
    align-items: center;
    gap: 5px;
}

input[type="radio"] {
    all: unset;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 2px solid #ef4723;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
}

input[type="radio"]::before {
    content: '';
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

input[type="radio"]:checked::before {
    background-color: #ef4723;
}

.contained-button {
    width: 100%;
}
</style>
