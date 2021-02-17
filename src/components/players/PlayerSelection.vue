<template>
    <div class="card">
        <div class="card-header">
            <span class="h5">Players</span>
        </div>
        <div class="card-body">
            <div class="row mb-2">
                <div class="col-10 pr-2 b-1">
                    <input
                        v-model="newPlayer"
                        type="text"
                        class="form-control"
                        placeholder="Add new player"/>
                </div>
                <div class="col-2 pl-1">
                    <button
                        class="btn btn-success"
                        type="button"
                        @click="addNewPlayer"
                    >
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </div>

            <draggable
                v-model="playerNames"
                tag="div"
                v-bind="dragOptions"
                @start="isDragging=true"
                @end="isDragging=false"
            >
                <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
                <div
                    v-for="(name, index) in playerNames"
                    :key="index"
                    class="pt-1"
                >
                    <div class="input-group">
                        <input
                            v-model="playerNames[index]"
                            type="text"
                            class="form-control"
                            :placeholder="name"
                            @click="preSelectText($event)">

                        <div class="input-group-append">
                            <span
                                @click="removePlayer(index)"
                                class="d-flex align-items-center text-danger float-right px-3"
                            >
                                <font-awesome-icon :icon="['fas', 'times']"/>
                            </span>
                        </div>
                    </div>
                </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'PlayerSelection',

  components: {
    draggable,
  },

  data() {
    return {
      playerNames: ['Player 1'],
      newPlayer: '',
      isDragging: false,
    };
  },

  computed: {
    players: {
      get() {
        return this.playerNames;
      },
      set(value) {
                console.log('i was here'); //eslint-disable-line
        this.playerNames = value;
        this.$emit('playersUpdated', this.playerNames);
      },
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    addNewPlayer() {
      if (!this.newPlayer) {
        return;
      }
      this.playerNames.push(this.newPlayer);
      this.newPlayer = '';
    },

    removePlayer(index) {
      if (index > -1) {
        this.playerNames.splice(index, 1);
      }
    },

    preSelectText(event) {
      event.target.setSelectionRange(0, event.target.value.length);
    },
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}

.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>