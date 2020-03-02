<template>
    <div>
        <p class="text-monospace mb-1">
            <transition-group name="list">
                <span
                    v-for="(score, index) in scores"
                    :key="index"
                    class="list-item"
                >
                    {{ score.number.value * score.multiplier }}
                    <span v-if="index < scores.length-1"> + </span>
                    <span v-else> = </span>
                </span>
            </transition-group>

            <span
                class="badge badge-primary"
                style="font-size: 1rem;"
            >
                <AnimatedNumber :number="scoreSum"/>
            </span>

            <span>
                (<AnimatedNumber :number="remainingScore"/>)
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
import AnimatedNumber from './AnimatedNumber.vue';
import CheckoutHint from './CheckoutHint.vue';

export default {
    name: 'ScoreLine',

    components: {
        AnimatedNumber,
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

<style scoped>
.list-item {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 1s;
}
.list-leave-active {
  position: absolute;
}
</style>