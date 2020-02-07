<template>
    <button
        type="button"
        class="btn btn-block btn-outline-secondary"
        @click="numberClicked"
    >
        {{ number }}
    </button>
</template>

<script>
export default {
    name: 'ScoreButton',

    props: {
        number: {
            type: Number,
            required: true,
        },

        scoreMultiplier: {
            type: Number,
            default: 1,
        },
    },

    methods: {
        numberClicked() {
            this.$emit('scoreButtonClicked', (this.number * this.scoreMultiplier))
        },
    },
}
</script>