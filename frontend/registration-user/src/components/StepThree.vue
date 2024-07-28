<template>
    <div>
        <h2>Passo 3: Criação de Senha</h2>
        <form @submit.prevent="validateStepThree">
            <div>
                <label for="password">Senha:</label>
                <input type="password" v-model="formData.password" @input="validateInput('password')" />
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </div>
            <button type="button" @click="$emit('prev')">Voltar</button>
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

<style>
.error-message {
    color: red;
    font-size: 12px;
}
</style>
