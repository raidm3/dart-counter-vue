<template>
  <div class="m-2">
    <div
      class="progress"
      style="height: 1.5rem;"
    >
      <div
        class="progress-bar bg-info"
        role="progressbar"
        :style="`width: ${this.activePlayerFinishedInPercent}%;`"
        :aria-valuenow="this.activePlayerFinishedInPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',

  data() {
    return {
      goal: 21,
    };
  },

  computed: {
    activePlayer() {
      return this.$store.getters.activePlayer;
    },

    activePlayerScore() {
      return this.activePlayer.score;
    },

    activePlayerFinishedInPercent() {
      return Math.floor(this.activePlayerScore * 100 / this.goal);
    },
  },
}
</script>