<template>
  <div class="mx-2">
    <div class="row">
      <div
        v-if="numberOfPlayers <= 2"
        class="col-12"
      >
        <ul
          v-if="!tournamentMode"
          class="list-group"
        >
          <PlayersHeaderItem
            v-for="player in players"
            :key="player.id"
            :playerName="player.name"
            :playerScore="player.score"
            :playerAverage="getPlayerAverage(player.id)"
            :isActive="activePlayer.id == player.id"
          />
        </ul>
        <ul
          v-else
          class="list-group"
        >
          <PlayersHeaderItemTournament
            v-for="player in players"
            :key="player.id"
            :playerName="player.name"
            :playerScore="player.score"
            :playerAverage="getPlayerAverage(player.id)"
            :playerSets="player.sets"
            :playerLegs="player.legs"
            :isActive="activePlayer.id == player.id"
          />
        </ul>
      </div>
      <div
        v-else
        v-for="(column, i) in splitPlayers"
        :key="i"
        :class="columnClass(i)"
      >
        <ul class="list-group">
          <PlayersHeaderItem
            v-for="player in column"
            :key="player.id"
            :playerName="player.name"
            :playerScore="player.score"
            :playerAverage="getPlayerAverage(player.id)"
            :isActive="activePlayer.id == player.id"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PlayersHeaderItem from './PlayersHeaderItem.vue';
import PlayersHeaderItemTournament from './PlayersHeaderItemTournament.vue';

export default {
  name: 'PlayersHeader',

  components: {
    PlayersHeaderItem,
    PlayersHeaderItemTournament,
  },

  computed: {
    players() {
      return this.$store.state.players;
    },

    activePlayer() {
      return this.$store.getters.activePlayer;
    },

    numberOfPlayers() {
      return this.$store.getters.numberOfPlayers;
    },

    tournamentMode() {
      return this.$store.getters.activeGameMode.tournament;
    },

    splitPlayers() {
      let result;

      if (this.numberOfPlayers > 2) {
        result = [[], []];
      } else {
        return this.players;
      }

      for (let i = 0, j = 0; i < this.numberOfPlayers; i++) {
        if (i < Math.round(this.numberOfPlayers / 2)) {
          result[0][i] = this.players[i];
        } else {
          result[1][j] = this.players[i];
          j++;
        }
      }

      return result;
    },

    numberOfColumns() {
      return this.numberOfPlayers > 2 ? 2 : 1;
    },
  },

  methods: {
    columnClass(index) {
      let classes = this.numberOfColumns == 2 ? 'col-6' : 'col-12';
      return index == 0 ? classes.concat(' pr-1') : classes.concat(' pl-1');
    },

    getPlayerAverage(id) {
      return this.$store.getters.getPlayerAverageById(id);
    },
  },
}
</script>