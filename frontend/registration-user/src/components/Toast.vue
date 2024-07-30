<template>
    <transition name="fade">
        <div v-if="visible" class="toast">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        message: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        show() {
            this.visible = true;
            setTimeout(() => {
                this.visible = false;
            }, 3000);
        }
    }
};
</script>

<style scoped>
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #0e6412;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>