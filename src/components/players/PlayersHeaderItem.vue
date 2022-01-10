<template>
  <div
    class="rounded"
    :class="isActive ? 'bg-primary text-white' : ''"
  >
    <span class="d-block text-uppercase font-weight-bold">{{ playerName }}</span>
    <span class="h4">
      <AnimatedNumber :number="playerScore"/>
    </span>
    <span class="font-weight-bold ml-2">⌀ {{ playerAverage }}</span>
  </div>
</template>

<script>
import AnimatedNumber from '../scores/AnimatedNumber.vue';

export default {
  name: 'PlayersHeaderItem',

  components: {
    AnimatedNumber,
  },

  props: {
    playerName: {
      type: String,
      required: true,
    },
    playerScore: {
      type: Number,
      required: true,
    },
    playerAverage: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>