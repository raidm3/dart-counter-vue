<template>
  <div>
    <div class="row m-1">
      <div class="col-6 px-2">
        <button class="btn btn-lg btn-block btn-danger" @click="$emit('undo')">
          <b>Undo</b>
          <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'undo']" />
        </button>
      </div>
      <div class="col-6 px-2">
        <button class="btn btn-lg btn-block btn-success" @click="$emit('accept')">
          <b>Accept</b>
        <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'check']" />
        </button>
      </div>
    </div>
    <div class="row m-1">
      <div class="col-6">
        <button class="btn btn-block btn-link" @click="quitGame">
          <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-left']" />
          <b>Quit Game</b>
        </button>
      </div>
      <div class="col-6">
        <span class="text-monospace btn d-block">Round: {{ currentRound }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionBar',

  props: {
    currentRound: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    quitGame() {
      this.$router.push({ path: '/' });
    },
  },
}
</script>