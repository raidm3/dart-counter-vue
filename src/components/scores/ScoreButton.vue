<template>
    <button
        type="button"
        class="btn btn-block px-1"
        :class="[
            number.done ? 'btn-dark' : 'btn-outline-dark',
            { 'custom-pulse': number.active },
            { 'btn-lg': big },
        ]"
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
        
    big: {
      type: Boolean,
      default: true,
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

<style scoped>
.custom-pulse {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
	transform: scale(1);
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}
</style>