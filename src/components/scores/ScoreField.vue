<template>
  <div v-if="legacyInputMode">
    <ScoreMultipliers
      @scoreMultiplierChanged="$emit('scoreMultiplierChanged', $event)"
      :scoreMultiplier="scoreMultiplier"
    />

    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([1, 2, 3])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([4, 5, 6])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([7, 8, 9])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([10, 11, 12])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([13, 14, 15])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([16, 17, 18])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([19, 20, 25])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
  </div>
  <div
    v-else
    class="mt-2"
  >
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([1, 2, 3])"
      :scoreMultiplier="scoreMultiplier"
      :bigButtons="true"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([4, 5, 6])"
      :scoreMultiplier="scoreMultiplier"
      :bigButtons="true"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([7, 8, 9])"
      :scoreMultiplier="scoreMultiplier"
      :bigButtons="true"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([0])"
      :scoreMultiplier="scoreMultiplier"
      :bigButtons="true"
      @scoreButtonClicked="$emit('scoreButtonClicked', $event)"
    />
  </div>
</template>

<script>
import ScoreMultipliers from "../scores/ScoreMultipliers.vue";
import ScoreButtonsLine from "../scores/ScoreButtonsLine.vue";

export default {
  name: 'ScoreField',

  components: {
    ScoreMultipliers,
    ScoreButtonsLine,
  },

  props: {
    legacyInputMode: {
      type: Boolean,
      default: false,
    },

    scoreMultiplier: {
      type: Number,
      required: true,
    },

    scores: {
      type: Array,
      required: true,
    },
  },

  methods: {
    createButtonLine(ids) {
      return ids.map(id => {
        return {
          name: id === 25 ? 'Bull' : `${id}`,
          value: id,
          disabled: this.scores.length === 3,
          done: false,
          active: false,
        }
      });
    },
  },
};
</script>