<template>
  <div>
    <div
      class="row py-1"
      :class="isActive ? 'bg-primary text-white' : ''"
    >
      <div class="col-6">
        <div class="rounded">
          <span class="d-block text-uppercase font-weight-bold">
            {{ playerName }}
          </span>
          <span class="h4">
            <AnimatedNumber :number="playerScore"/>
          </span>
          <span class="font-weight-bold ml-2">
            ⌀ {{ playerAverage }}
          </span>
        </div>
      </div>
      <div class="col-3">
        <span class="d-block">Sets</span>
        <span class="d-block font-weight-bold">
          {{ playerSets }}
        </span>
      </div>
      <div class="col-3">
        <span class="d-block">Legs</span>
        <span class="d-block font-weight-bold">
          {{ playerLegs }}
        </span>
      </div>
    </div>
  </div>

  <!-- <div
    class="rounded"
    :class="isActive ? 'bg-primary text-white' : ''"
  >
    <span class="d-block text-uppercase font-weight-bold">{{ playerName }}</span>
    <span class="h4">
      <AnimatedNumber :number="playerScore"/>
    </span>
    <span class="font-weight-bold ml-2">⌀ {{ playerAverage }}</span>
  </div> -->
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
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    playerSets: {
      type: Number,
      required: true,
    },
    playerLegs: {
      type: Number,
      required: true,
    },
  },
};
</script>