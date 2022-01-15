<template>
<div>
  <nav class="navbar navbar-expand navbar-dark bg-primary">
    <span class="navbar-brand mb-0 h1">
      Darts Counter
    </span>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse" 
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button 
            type="button"
            class="btn nav-link"
            data-toggle="modal"
            data-target="#checkoutsModal"
          >
            Checkouts
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <div
    class="modal fade"
    id="checkoutsModal"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
          >
            Checkouts
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <div class="table">
              <tbody>
                <tr>
                  <td>61</td>
                  <td>T15</td>
                  <td>D8</td>
                  <td>&nbsp;</td>
                  <td>71</td>
                  <td>T13</td>
                  <td>D16</td>
                </tr>
                <tr>
                  <td>62</td>
                  <td>T10</td>
                  <td>D16</td>
                  <td>&nbsp;</td>
                  <td>72</td>
                  <td>T16</td>
                  <td>D12</td>
                </tr>
                <tr>
                  <td>63</td>
                  <td>T13</td>
                  <td>D12</td>
                  <td>&nbsp;</td>
                  <td>73</td>
                  <td>T19</td>
                  <td>D8</td>
                </tr>
                <tr>
                  <td>64</td>
                  <td>T16</td>
                  <td>D8</td>
                  <td>&nbsp;</td>
                  <td>74</td>
                  <td>T14</td>
                  <td>D16</td>
                </tr>
                <tr>
                  <td>65</td>
                  <td>T19</td>
                  <td>D4</td>
                  <td>&nbsp;</td>
                  <td>75</td>
                  <td>T17</td>
                  <td>D12</td>
                </tr>
                <tr>
                  <td>66</td>
                  <td>T10</td>
                  <td>D18</td>
                  <td>&nbsp;</td>
                  <td>76</td>
                  <td>T20</td>
                  <td>D8</td>
                </tr>
                <tr>
                  <td>67</td>
                  <td>T17</td>
                  <td>D8</td>
                  <td>&nbsp;</td>
                  <td>77</td>
                  <td>T19</td>
                  <td>D10</td>
                </tr>
                <tr>
                  <td>68</td>
                  <td>T20</td>
                  <td>D4</td>
                  <td>&nbsp;</td>
                  <td>78</td>
                  <td>T18</td>
                  <td>D12</td>
                </tr>
                <tr>
                  <td>69</td>
                  <td>T15</td>
                  <td>D12</td>
                  <td>&nbsp;</td>
                  <td>79</td>
                  <td>T19</td>
                  <td>D11</td>
                </tr>
                <tr>
                  <td>70</td>
                  <td>T10</td>
                  <td>D20</td>
                  <td>&nbsp;</td>
                  <td>80</td>
                  <td>T20</td>
                  <td>D10</td>
                </tr>
              </tbody>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary ml-auto"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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
      v-if="this.activeGameModeType === 'Classic' && this.activeGameMode.id !== 4"
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
                      :disabled="playerNames.length >= 4 || (activeGameModeId === 4 && playerNames.length >= 2) || (activeGameModeId === 6 && playerNames.length >= 2)"
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
      // Check if Cricket/Tournament has been selected to disable player add/remove functionality
      if (id === 4 || id === 6) {
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

  mounted() {
    const players = this.$store.getters.getPlayers;

    if (players.length > 0) {
      this.playerNames = players.map(player => ({ id: player.id, name: player.name }));
      this.newPlayerId = players.length+1;
    }

    this.$store.dispatch('setActiveGameMode', this.activeGameModeId);
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