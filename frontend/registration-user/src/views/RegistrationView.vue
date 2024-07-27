<script setup>
import { registrationUser } from "@/services/api";
import { reactive } from "vue";

const userPF = reactive({
    email: "",
    type: "PF",
    name: "",
    cpf: "",
    birthDate: "",
    phone: "",
    password: "",
});

const userPJ = reactive({
    email: "",
    type: "PJ",
    companyName: "",
    cnpj: "",
    openingDate: "",
    phone: "",
    password: "",
});

async function handleRegistrationPF() {
    console.log(
        userPF.email,
        userPF.type,
        userPF.name,
        userPF.cpf,
        userPF.birthDate,
        userPF.phone,
        userPF.password
    );

    try {
        const response = await registrationUser(userPF);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

async function handleRegistrationPJ() {
    console.log(
        userPJ.email,
        userPJ.type,
        userPJ.companyName,
        userPJ.cnpj,
        userPJ.openingDate,
        userPJ.phone,
        userPJ.password
    );

    try {
        const response = await registrationUser(userPJ);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <form action="" @submit.prevent="handleRegistrationPF">
        <input type="text" placeholder="Email" v-model="userPF.email" />
        <input type="text" placeholder="Tipo" v-model="userPF.type" readonly />
        <input type="text" placeholder="Nome" v-model="userPF.name" />
        <input type="text" placeholder="CPF" v-model="userPF.cpf" />
        <input type="text" placeholder="Data de nascimento" v-model="userPF.birthDate" />
        <input type="text" placeholder="Número de telefone" v-model="userPF.phone" />
        <input type="password" placeholder="Password" v-model="userPF.password" />
        <button type="submit">CADASTRAR</button>
    </form>

    <form action="" @submit.prevent="handleRegistrationPJ">
        <input type="text" placeholder="Email" v-model="userPJ.email" />
        <input type="text" placeholder="Tipo" v-model="userPJ.type" readonly />
        <input type="text" placeholder="Razão social" v-model="userPJ.companyName" />
        <input type="text" placeholder="CNPJ" v-model="userPJ.cnpj" />
        <input type="text" placeholder="Data de abertura da empresa" v-model="userPJ.openingDate" />
        <input type="text" placeholder="Número de telefone" v-model="userPJ.phone" />
        <input type="password" placeholder="Password" v-model="userPJ.password" />
        <button type="submit">CADASTRAR</button>
    </form>
</template>

<style></style>
