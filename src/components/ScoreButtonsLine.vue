<template>
    <div class="row mx-2 my-2">
        <div
            v-for="number in scoreButtonNumbers"
            :key="number"
            :class="`col-${numberOfColumns}`"
            class="px-1"
        >
            <ScoreButton
                :number="number"
                :scoreMultiplier="scoreMultiplier"
                @scoreButtonClicked="$emit('scoreButtonClicked', $event)"/>
        </div>
    </div>
</template>

<script>
import ScoreButton from './ScoreButton';

export default {
    name: 'ScoreButtonsLine',

    components: {
        ScoreButton,
    },

    props: {
        scoreButtonNumbers: {
            type: Array,
            required: true,
        },

        scoreMultiplier: {
            type: Number,
            default: 1,
        },
    },

    computed: {
        numberOfColumns() {
            return 12 / this.scoreButtonNumbers.length;
        },
    },
}
</script>