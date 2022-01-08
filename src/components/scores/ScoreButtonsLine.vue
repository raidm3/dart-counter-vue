<template>
    <div class="row m-2">
        <div
            v-for="(number, index) in scoreButtonNumbers"
            :key="index"
            :class="`col-${numberOfColumns}`"
            class="px-2"
        >
            <ScoreButton
                :number="number"
                :scoreMultiplier="scoreMultiplier"
                :big="bigButtons"
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

    bigButtons: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    numberOfColumns() {
      return 12 / this.scoreButtonNumbers.length;
    },
  },
}
</script>