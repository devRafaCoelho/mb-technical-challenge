<template>
    <div>
        <h2>Passo 1: Informações Iniciais</h2>
        <form @submit.prevent="validateStepOne">
            <div>
                <label for="email">Email:</label>
                <input type="text" v-model="formData.email" @input="validateInput('email')" />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            <div>
                <label>Tipo de Cadastro:</label>
                <div>
                    <input type="radio" id="pf" value="PF" v-model="formData.registrationType" />
                    <label for="pf">Pessoa Física</label>
                </div>
                <div>
                    <input type="radio" id="pj" value="PJ" v-model="formData.registrationType" />
                    <label for="pj">Pessoa Jurídica</label>
                </div>
            </div>
            <button type="submit">Continuar</button>
        </form>
    </div>
</template>

<script>
export default {
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
                if (!this.formData.email) {
                    this.errors.email = 'Email is required';
                } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
                    this.errors.email = 'Invalid email format';
                } else {
                    this.errors.email = '';
                }
            }
        },
        validateStepOne() {
            let valid = true;

            if (!this.formData.email) {
                this.errors.email = 'Email is required';
                valid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
                this.errors.email = 'Invalid email format';
                valid = false;
            }

            if (valid) {
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
.error-message {
    color: red;
    font-size: 12px;
}
</style>
