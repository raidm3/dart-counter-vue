<template>
    <div class="refresh-dialog" v-if="prompt">
        <div class="refresh-dialog__message">
            New version available. Refresh now?
        </div>
        <div
            class="refresh-dialog__button refresh-dialog__button--cancel"
            @click="prompt = false"
        >
            Later
        </div>
        <div
            class="refresh-dialog__button refresh-dialog__button--accept"
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
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 8px;
    }

    .refresh-dialog > .refresh-dialog__message {
    grid-column: 1 / 3;
    }

    .refresh-dialog > .refresh-dialog__button {
    padding: 0 8px;
    height: 36px;
    line-height: 36px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    }

    .refresh-dialog > .refresh-dialog__button--accept {
    justify-self: end;
    color: #f2a900;
    }
</style>