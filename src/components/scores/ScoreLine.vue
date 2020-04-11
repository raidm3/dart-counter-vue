<template>
  <div class="mx-2 py-1">
    <p class="text-monospace mb-0">
      <transition-group name="list">
        <span
          v-for="(score, index) in scores"
          :key="index" class="list-item"
        >
          {{ formatScore(score) }}
          <span v-if="index < scores.length-1"> - </span>
        </span>
      </transition-group>

      <span v-if="scores.length === 0"> - - - </span>

      <span v-if="showSum">
        <span v-if="scores.length > 0"> = </span>
        <AnimatedNumber
          :number="scoreSum"
          class="badge badge-primary"
          style="font-size: 1rem;"
        />
      </span>

      <span v-if="showRemainingScore">
        (<AnimatedNumber :number="remainingScore" />)
      </span>

      <CheckoutHint
        v-if="showCheckoutHint"
        :scores="scores"
        :activePlayerScore="activePlayerScore"
        :scoreSum="scoreSum"
      />
    </p>
  </div>
</template>

<script>
import AnimatedNumber from "./AnimatedNumber.vue";
import CheckoutHint from "./CheckoutHint.vue";

export default {
  name: "ScoreLine",

  components: {
    AnimatedNumber,
    CheckoutHint,
  },

  props: {
    scores: {
      type: Array,
      required: true,
    },

    showSum: {
      type: Boolean,
      default: false,
    },

    showRemainingScore: {
      type: Boolean,
      default: false,
    },

    showCheckoutHint: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    scoreSum() {
      let sum = 0;

      this.scores.forEach(item => {
        sum += item.number.value * item.multiplier;
      });

      return sum;
    },

    activePlayerScore() {
      return this.$store.getters.activePlayer.score;
    },

    remainingScore() {
      return this.activePlayerScore - this.scoreSum;
    },
  },

  methods: {
    formatScore(score) {
      const prefix = score.multiplier === 3 ? 'T' : score.multiplier === 2 ? 'D' : '';
      const suffix = score.number.name === 'Bull' && score.multiplier === 2 ? 'B' : score.number.name;

      return prefix + suffix;
    },
  },
};
</script>

<style scoped>
.list-item {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.5s;
}
.list-leave-active {
  position: absolute;
}
</style>