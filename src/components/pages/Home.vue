<template>
  <div class="card">
    <div class="card-header">
      <b>Choose a game mode</b>
    </div>
    <div class="card-body">
        <div class="list-group">
            <button
                v-for="mode in gameModes"
                :key="mode.id"
                type="button"
                class="list-group-item list-group-item-action"
                :class="{ active: activeGameModeId === mode.id }"
                @click="selectGameMode(mode.id)"
            >
                {{ mode.name }}
            </button>
        </div>
        <form class="mt-3">
            <div
                v-for="(name, index) in playerNames"
                :key="index"
                class="row mb-2"
            >
                <div class="col-10 pr-2">
                    <input
                        v-model="playerNames[index]"
                        type="text"
                        class="form-control"
                        :placeholder="name"
                        @click="preSelectText($event)"/>
                </div>
                <div class="col-2 pl-2">
                    <button
                        v-if="index == 0"
                        class="btn btn-success"
                        type="button"
                        @click="addPlayer()"
                    >
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                    <button
                        v-else
                        class="btn btn-danger mr-2"
                        type="button"
                        @click="removePlayer()"
                    >
                        <font-awesome-icon :icon="['fas', 'minus']" />
                    </button>
                </div>
            </div>
        </form>
    </div>
    <div class="card-footer">
        <button
            class="btn btn-primary btn-block"
            @click="startGame()"
        >
            <b>Let's Dart!</b>
        </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Home',

    data() {
        return {
            playerNames: ['Player 1'],
        };
    },

    computed: {
        gameModes() {
            return this.$store.state.gameModes;
        },

        activeGameMode() {
            return this.$store.getters.activeGameMode;
        },

        activeGameModeId() {
            return this.activeGameMode.id;
        },

        activeGameModeName() {
            return this.activeGameMode.name;
        },
    },

    methods: {
        selectGameMode(id) {
            this.$store.dispatch('setActiveGameMode', id);
        },

        startGame() {
            this.$store.dispatch('startGame', {
                names: this.playerNames,
                mode: this.activeGameMode,
            });
            this.$router.push({ name: 'play', params: { mode: this.activeGameModeName } });
        },

        addPlayer() {
            if (this.playerNames.length < 4) {
                this.playerNames.push(`Player ${this.playerNames.length+1}`);
            }
        },

        removePlayer() {
            if (this.playerNames.length > 1) {
                this.playerNames.pop();
            }
        },

        preSelectText(event) {
            event.target.setSelectionRange(0, event.target.value.length);
        },
    },
}
</script>
