<template>
<div>
    <div class="container bg-info text-white py-2">
        <h2 class="display-5 mb-0">
            <font-awesome-icon :icon="['fas', 'crosshairs']" />
            Darts Counter
            <font-awesome-icon :icon="['fas', 'crosshairs']" />
        </h2>
    </div>
    <div class="card border-bottom-0">
        <div class="card-body">
            <h6 class="card-title text-monospace">
                <font-awesome-icon :icon="['fas', 'angle-double-left']" />
                GAME MODE
                <font-awesome-icon :icon="['fas', 'angle-double-right']" />
            </h6>
            <div class="list-group">
                <button
                    v-for="mode in gameModes"
                    :key="mode.id"
                    type="button"
                    class="list-group-item list-group-item-action py-2"
                    :class="{
                        'active': activeGameModeId === mode.id,
                        'font-weight-bold': activeGameModeId === mode.id
                    }"
                    @click="selectGameMode(mode.id)"
                >
                    {{ mode.name }}
                </button>
            </div>
        </div>
    </div>

    <!-- Game Options -->
    <div
        v-if="this.activeGameModeType === 'Classic'"
        class="card border-bottom-0"
    >
        <div class="card-body">
            <h6 class="card-title text-monospace">
                <font-awesome-icon :icon="['fas', 'angle-double-left']" />
                FINISH OPTIONS
                <font-awesome-icon :icon="['fas', 'angle-double-right']" />
            </h6>
            <div class="d-block">
                <div class="custom-control custom-radio custom-control-inline">
                    <input
                        v-model="gameOptions"
                        type="radio"
                        id="singleOutRadioBtn"
                        name="optionRadios"
                        class="custom-control-input"
                        value="singleOut"
                        checked>
                    <label class="custom-control-label" for="singleOutRadioBtn">Single Out</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input
                        v-model="gameOptions"
                        type="radio"
                        id="doubleOutRadioBtn"
                        name="optionRadios"
                        class="custom-control-input"
                        value="doubleOut">
                    <label class="custom-control-label" for="doubleOutRadioBtn">Double Out</label>
                </div>
            </div>
        </div>
    </div>

    <!-- Player settings -->
    <div class="card">
        <div class="card-body">
            <h6 class="card-title text-monospace">
                <font-awesome-icon :icon="['fas', 'angle-double-left']" />
                PLAYERS
                <font-awesome-icon :icon="['fas', 'angle-double-right']" />
            </h6>
            <div class="input-group">
                <input
                        v-model="newPlayer"
                        type="text"
                        class="form-control"
                        placeholder="Add new player"/>
                <div class="input-group-append border">
                    <button
                        type="button"
                        class="btn btn-success d-flex align-items-center px-3"
                        :disabled="playerNames.length >= 4 || activeGameModeId === 5"
                        @click="addNewPlayer"
                    >
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </div>

            <draggable
                v-model="playerNames"
                tag="div"
                handle=".handle"
                v-bind="dragOptions"
                @start="isDragging=true"
                @end="isDragging=false"
            >
                <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
                    <div
                        v-for="(player, index) in playerNames"
                        :key="player.id"
                        class="input-group pt-2"
                    >
                        <div class="input-group-prepend border handle">
                            <span class="d-flex align-items-center text-muted px-3">
                                <font-awesome-icon :icon="['fas', 'arrows-alt-v']" />
                            </span>
                        </div>
                        <input
                            v-model="player.name"
                            type="text"
                            class="form-control"
                            :placeholder="player.name"
                            @click="preSelectText">

                        <div class="input-group-append border">
                            <button
                                type="button"
                                class="btn btn-danger px-3 d-flex align-items-center"
                                :disabled="playerNames.length === 1 || activeGameModeId === 5"
                                @click="removePlayer(index)"
                            >
                                <font-awesome-icon :icon="['fas', 'times']"/>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>

    <div class="m-2">
        <button
            class="btn btn-lg btn-block btn-primary"
            @click="startGame"
        >
            <b>Let's Dart!</b>
        </button>
    </div>
</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: 'Home',

    components: {
        draggable,
    },

    data() {
        return {
            playerNames: [ { id: 1, name: 'Player 1' } ],
            newPlayer: '',
            newPlayerId: 2,
            isDragging: false,
        };
    },

    computed: {
        gameModes() {
            return this.$store.state.gameModes;
        },

        gameOptions: {
            get() {
                return this.activeGameMode.option;
            },

            set(option) {
                this.$store.dispatch('setGameOption', option);
            }
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

        activeGameModeType() {
            return this.activeGameMode.type;
        },

        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
    },

    methods: {
        selectGameMode(id) {
            // Check if Cricket has been selected to disable player add/remove functionality
            if (id === 5) {
                this.playerNames = [
                    { id: 1, name: 'Player 1' },
                    { id: 2, name: 'Player 2' }
                ];
                this.newPlayerId++;
            }
            this.$store.dispatch('setActiveGameMode', id);
        },

        startGame() {
            this.$store.dispatch('startGame', {
                names: this.playerNames,
                mode: this.activeGameMode,
                option: this.gameOptions,
            });

            this.$router.push({ name: 'play', params: { mode: this.activeGameModeType } });
        },

        addNewPlayer() {
            if (this.playerNames.length >= 4) {
                return;
            }

            if (this.newPlayer === '') {
                this.playerNames.push({ id: this.newPlayerId++, name: `Player ${this.playerNames.length+1}` });
            } else {
                this.playerNames.push({ id: this.newPlayerId++, name: this.newPlayer });
            }

            this.newPlayer = '';
        },

        removePlayer(index) {
            if (index > -1 && this.playerNames.length > 1) {
                this.playerNames.splice(index, 1);
            }
        },

        preSelectText(event) {
            event.target.focus();
            event.target.setSelectionRange(0, event.target.value.length);
        },
    },
}
</script>

<style scoped>
.text-disabled {
    color: #eee;
}
.flip-list-move {
  transition: transform 1s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
</style>