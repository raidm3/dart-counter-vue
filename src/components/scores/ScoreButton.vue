<template>
    <button
        type="button"
        class="btn btn-lg btn-block px-1"
        :class="[ number.done ? 'btn-dark' : 'btn-outline-secondary' ]"
        aria-pressed="false"
        :disabled="number.disabled"
        @click="numberClicked"
    >
        <font-awesome-icon
            v-if="number.done"
            :icon="['fas', 'check']"
        />
        <span v-else>{{ number.name }}</span>
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