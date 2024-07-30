<template>
    <button :class="buttonClass" @click="$emit('click')">
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        variant: {
            type: String,
            default: 'contained',
            validator(value) {
                return ['contained', 'outlined'].includes(value);
            }
        },
        text: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '100%',
            validator(value) {
                return ['100%', '50%'].includes(value);
            }
        }
    },
    computed: {
        buttonClass() {
            return {
                'btn-contained': this.variant === 'contained',
                'btn-outlined': this.variant === 'outlined',
                'btn-full-width': this.width === '100%',
                'btn-half-width': this.width === '50%'
            };
        }
    }
};
</script>

<style scoped>
.btn-contained,
.btn-outlined {
    all: unset;
    box-sizing: border-box;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in;
}

.btn-contained {
    background-color: #ef4723;
    color: #fff;
}

.btn-outlined {
    background-color: transparent;
    color: #ef4723;
    border: 2px solid #ef4723;
}

.btn-full-width {
    width: 100%;
}

.btn-half-width {
    width: 50%;
}

.btn-contained:hover {
    background-color: #b3280b;
}

.btn-outlined:hover {
    background-color: #ffeae5;
}
</style>