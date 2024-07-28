<template>
    <div>
        <h2>Passo 4: Revisão</h2>
        <div>
            <h3>Informações Iniciais</h3>
            <div>
                <label for="email">Email:</label>
                <input id="email" type="text" :value="formData.email" disabled />
            </div>
            <div>
                <label for="registrationType">Tipo de Cadastro:</label>
                <input id="registrationType" type="text" :value="formData.registrationType" disabled />
            </div>
        </div>
        <div v-if="formData.registrationType === 'PF'">
            <h3>Informações Pessoais</h3>
            <div>
                <label for="name">Nome:</label>
                <input id="name" type="text" :value="formData.name" disabled />
            </div>
            <div>
                <label for="cpf">CPF:</label>
                <input id="cpf" type="text" :value="formData.cpf" disabled />
            </div>
            <div>
                <label for="birthDate">Data de Nascimento:</label>
                <input id="birthDate" type="text" :value="formData.birthDate" disabled />
            </div>
            <div>
                <label for="cpfPhone">Telefone:</label>
                <input id="cpfPhone" type="text" :value="formData.cpfPhone" disabled />
            </div>
        </div>
        <div v-else>
            <h3>Informações da Empresa</h3>
            <div>
                <label for="companyName">Razão Social:</label>
                <input id="companyName" type="text" :value="formData.companyName" disabled />
            </div>
            <div>
                <label for="cnpj">CNPJ:</label>
                <input id="cnpj" type="text" :value="formData.cnpj" disabled />
            </div>
            <div>
                <label for="openingDate">Data de Abertura:</label>
                <input id="openingDate" type="text" :value="formData.openingDate" disabled />
            </div>
            <div>
                <label for="cnpjPhone">Telefone:</label>
                <input id="cnpjPhone" type="text" :value="formData.cnpjPhone" disabled />
            </div>
        </div>
        <div>
            <h3>Senha</h3>
            <div>
                <label for="password">Senha:</label>
                <input id="password" type="text" :value="formData.password" disabled />
            </div>
        </div>
        <button type="button" @click="$emit('prev')">Voltar</button>
        <button type="button" @click="submitForm">Cadastrar</button>
    </div>
</template>

<script>
import { registrationUser } from '@/services/api';

export default {
    props: ['formData'],
    methods: {
        async submitForm() {
            try {
                const response = await registrationUser(this.formData);
                this.$emit('submit', response);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style></style>
