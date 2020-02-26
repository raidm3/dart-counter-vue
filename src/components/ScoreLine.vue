<template>
    <div>
        <p class="text-monospace mb-1">
            <span
                v-for="(score, index) in scores"
                :key="index"
            >
                {{ score.number.value * score.multiplier }}
                <span v-if="index < scores.length-1"> + </span>
                <span v-else> = </span>
            </span>
            <span
                class="badge badge-primary"
                style="font-size: 1rem;"
            >
                {{ scoreSum }}
            </span>
            <span>
                ({{ remainingScore }})
            </span>

            <CheckoutHint
                v-if="finishOption == 'doubleOut'"
                :scores="scores"
                :activePlayerScore="activePlayerScore"
                :scoreSum="scoreSum"
            />
        </p>
    </div>
</template>

<script>
import CheckoutHint from './CheckoutHint.vue';

export default {
    name: 'ScoreLine',

    components: {
        CheckoutHint,
    },

    props: {
        scores: {
            type: Array,
        },

        scoreSum: {
            type: Number,
            default: 0,
        },

        activePlayerScore: {
            type: Number,
            required: true,
        },
    },

    computed: {
        remainingScore() {
            return this.activePlayerScore - this.scoreSum;
        },

        finishOption() {
            return this.$store.getters.activeGameMode.option;
        },
    }
}
</script>