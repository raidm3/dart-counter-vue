<template>
  <div id="app">
    <router-view></router-view>

    <div class="upgrade-dialog" v-if="prompt">
      <div class="upgrade-dialog__message">
        A new version is found. Refresh to load it?
      </div>
      <div
        class="upgrade-dialog__button upgrade-dialog__button--accept"
        @click="upgrade"
      >
        Refresh
      </div>
      <div
        class="upgrade-dialog__button upgrade-dialog__button--cancel"
        @click="prompt = false"
      >
        Later
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',

  data() {
    return {
      prompt: false
    };
  },

  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },

  methods: {
    async upgrade() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0.25rem;
}

.upgrade-dialog {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px 12px;
  color: white;
  background-color: #2c3e50;
  box-shadow: 0 4px 4px rgba(#2c3e50, 0.4);
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 8px;
}

.upgrade-dialog > .upgrade-dialog__message {
  grid-column: 1 / 3;
}

.upgrade-dialog > .upgrade-dialog__button {
  padding: 0 8px;
  height: 36px;
  line-height: 36px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.upgrade-dialog > .upgrade-dialog__button--accept {
  justify-self: end;
}
</style>
