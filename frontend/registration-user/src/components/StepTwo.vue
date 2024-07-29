<template>
    <div>
        <h2>Passo 2: Detalhes do Cadastro</h2>
        <form @submit.prevent="validateStepTwo">
            <div v-if="formData.registrationType === 'PF'">
                <div>
                    <InputField label="Nome" id="name" type="text" v-model="formData.name" :errorMessage="errors.name"
                        @input="validateInput('name', 'letters')" />
                </div>
                <div>
                    <label for="cpf">CPF:</label>
                    <input type="text" v-model="formData.cpf" @input="validateInput('cpf', 'numbers', 11)" />
                    <span v-if="errors.cpf" class="error-message">{{ errors.cpf }}</span>
                </div>
                <div>
                    <label for="birthDate">Data de Nascimento:</label>
                    <input type="date" v-model="formData.birthDate" @input="validateInput('birthDate')" />
                    <span v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</span>
                </div>
                <div>
                    <label for="cpfPhone">Número de Telefone:</label>
                    <input type="text" v-model="formData.cpfPhone" @input="validateInput('cpfPhone', 'numbers', 11)" />
                    <span v-if="errors.cpfPhone" class="error-message">{{ errors.cpfPhone }}</span>
                </div>
            </div>
            <div v-if="formData.registrationType === 'PJ'">
                <div>
                    <label for="companyName">Razão Social:</label>
                    <input type="text" v-model="formData.companyName"
                        @input="validateInput('companyName', 'letters')" />
                    <span v-if="errors.companyName" class="error-message">{{ errors.companyName }}</span>
                </div>
                <div>
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" v-model="formData.cnpj" @input="validateInput('cnpj', 'numbers', 14)" />
                    <span v-if="errors.cnpj" class="error-message">{{ errors.cnpj }}</span>
                </div>
                <div>
                    <label for="openingDate">Data de Abertura:</label>
                    <input type="date" v-model="formData.openingDate" @input="validateInput('openingDate')" />
                    <span v-if="errors.openingDate" class="error-message">{{ errors.openingDate }}</span>
                </div>
                <div>
                    <label for="cnpjPhone">Número de Telefone:</label>
                    <input type="text" v-model="formData.cnpjPhone"
                        @input="validateInput('cnpjPhone', 'numbers', 11)" />
                    <span v-if="errors.cnpjPhone" class="error-message">{{ errors.cnpjPhone }}</span>
                </div>
            </div>
            <button type="button" @click="$emit('prev')">Voltar</button>
            <button type="submit">Continuar</button>

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
                name: '',
                cpf: '',
                birthDate: '',
                cpfPhone: '',
                companyName: '',
                cnpj: '',
                openingDate: '',
                cnpjPhone: ''
            }
        };
    },
    methods: {
        validateInput(field, type = '', maxLength = 0) {
            if (type === 'letters') {
                this.formData[field] = this.formData[field].replace(/[^a-zA-Z\s]/g, '');
            } else if (type === 'numbers') {
                this.formData[field] = this.formData[field].replace(/[^0-9]/g, '').slice(0, maxLength);
            }

            this.errors[field] = this.getErrorMessage(field);
        },
        getErrorMessage(field) {
            const phoneRegex = /^\d{10,11}$/;
            let error = '';

            if (this.formData.registrationType === 'PF') {
                switch (field) {
                    case 'name':
                        if (!this.formData.name) {
                            error = 'O Nome é obrigatório';
                        }
                        break;
                    case 'cpf':
                        if (!this.formData.cpf) {
                            error = 'CPF é obrigatório';
                        } else if (!/^\d{11}$/.test(this.formData.cpf)) {
                            error = 'CPF inválido';
                        }
                        break;
                    case 'birthDate':
                        if (!this.formData.birthDate) {
                            error = 'A Data de Nascimento é obrigatória';
                        } else if (isNaN(new Date(this.formData.birthDate).getTime())) {
                            error = 'Data de nascimento inválida';
                        }
                        break;
                    case 'cpfPhone':
                        if (!this.formData.cpfPhone) {
                            error = 'O Telefone é obrigatório';
                        } else if (!phoneRegex.test(this.formData.cpfPhone)) {
                            error = 'Telefone inválido';
                        }
                        break;
                }
            } else if (this.formData.registrationType === 'PJ') {
                switch (field) {
                    case 'companyName':
                        if (!this.formData.companyName) {
                            error = 'A Razão Social é obrigatória';
                        }
                        break;
                    case 'cnpj':
                        if (!this.formData.cnpj) {
                            error = 'O CNPJ é obrigatório';
                        } else if (!/^\d{14}$/.test(this.formData.cnpj)) {
                            error = 'CNPJ inválido';
                        }
                        break;
                    case 'openingDate':
                        if (!this.formData.openingDate) {
                            error = 'A Data de Abertura é obrigatória';
                        } else if (isNaN(new Date(this.formData.openingDate).getTime())) {
                            error = 'Data de Abertura inválida';
                        }
                        break;
                    case 'cnpjPhone':
                        if (!this.formData.cnpjPhone) {
                            error = 'O Telefone é obrigatório';
                        } else if (!phoneRegex.test(this.formData.cnpjPhone)) {
                            error = 'Telefone inválido';
                        }
                        break;
                }
            }

            return error;
        },
        validateStepTwo() {
            let valid = true;

            this.errors = {
                name: '',
                cpf: '',
                birthDate: '',
                cpfPhone: '',
                companyName: '',
                cnpj: '',
                openingDate: '',
                cnpjPhone: ''
            };

            ['name', 'cpf', 'birthDate', 'cpfPhone', 'companyName', 'cnpj', 'openingDate', 'cnpjPhone'].forEach(field => {
                const errorMessage = this.getErrorMessage(field);
                if (errorMessage) {
                    this.errors[field] = errorMessage;
                    valid = false;
                }
            });

            if (valid) {
                this.$emit('next');
            }
        }
    }
};
</script>
