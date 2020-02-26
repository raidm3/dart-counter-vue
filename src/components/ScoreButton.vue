<template>
    <button
        type="button"
        class="btn btn-block btn-outline-secondary"
        aria-pressed="false"
        @click="numberClicked"
    >
        {{ number.name }}
    </button>
</template>

<script>
export default {
    name: 'ScoreButton',

    props: {
        number: {
            type: Object,
            required: true,
        },

        scoreMultiplier: {
            type: Number,
            default: 1,
        },
    },

    methods: {
        numberClicked() {
            this.$emit('scoreButtonClicked', {
                number : this.number,
                multiplier: this.scoreMultiplier,
            });
        },
    },
}
</script>