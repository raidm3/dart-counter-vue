<template>
    <div class="refresh-dialog" v-if="prompt">
        <div class="refresh-dialog__message">
            New version available. Refresh now?
        </div>
        <div
            class="btn btn-warning font-weight-bold mt-2"
            @click="refresh"
        >
            Refresh
        </div>
    </div>
</template>

<script>
export default {
  name: 'RefreshDialog',

  data() {
    return {
      prompt: false,
    };
  },

  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
      this.$workbox.addEventListener("isUpdate", () => {
        this.prompt = true;
      });
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
      this.$workbox.addEventListener("externalwaiting", () => {
        this.prompt = true;
      });
    }
  },

  methods: {
    async refresh() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
}
</script>

<style scoped>
.refresh-dialog {
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
}
</style>