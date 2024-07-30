<template>
    <div>
        <h4 class="step-title">
            Etapa <span class="step-number">{{ stepNumber }}</span> de 4
        </h4>
        <h1 class="welcome-text">{{ text }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        stepNumber: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.step-title {
    margin: 5px 0;
}

.step-number {
    color: #ef4723
}

.welcome-text {
    margin-bottom: 30px;
}
</style>