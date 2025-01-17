<template>
  <div>
    <div class="alert alert-success" role="alert">
      <font-awesome-icon class="h1" :icon="['fas', 'trophy']" />
      <h5 class="alert-heading">
        Victory!
      </h5>
      <h3 class="font-weight-bold">
        {{ winnerName }}
      </h3>

      <div v-if="tournamentMode">
        <span class="d-block">Sets</span>
        <span class="d-block">{{ players[0].sets }} - {{ players[1].sets }}</span>
      </div>

      <div v-if="activeGameType !== 'Classic'">
        <span v-for="player in players" :key="player.id">
          <span>{{ player.name }}:</span>
          <span class="font-weight-bold pl-2">{{ player.score }} Points</span>
          <br />
        </span>
      </div>

      <hr>

      <p class="mb-1">
        Game has been finished in <b>Round {{ currentRound }}</b>
      </p>
      <div v-if="activeGameType === 'Classic'" class="mb-1">
        Best shot <b>{{ highscore.score }}</b> from <b>{{ highscorePlayer.name }}</b>
        <br />
        Checkout: <b>{{ checkoutScore }}</b>

        <hr>

        <span class="h5 d-block mt-2">Stats</span>
        <table class="table table-borderless table-sm text-white">
          <thead>
            <tr class="border-bottom">
              <th class="border-right" colspan="1" scope="col"></th>
              <th scope="col">Average</th>
              <th scope="col">60+</th>
              <th scope="col">100+</th>
              <th scope="col">140+</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="player in players"
              :key="player.id"
            >
              <th class="border-right" colspan="1" scope="row">{{ player.name }}</th>
              <td>⌀ {{ getPlayerAverage(player.id) }}</td>
              <td>{{ getHighShotOfPlayer(player.id, 60, 99) }}x</td>
              <td>{{ getHighShotOfPlayer(player.id, 100, 139) }}x</td>
              <td>{{ getHighShotOfPlayer(player.id, 140, 180) }}x</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-borderless table-sm text-white">
          <thead>
            <tr class="border-bottom">
              <th class="border-right" colspan="1" scope="col"></th>
              <th scope="col">Match Darts</th>
              <th scope="col">Legs</th>
              <th scope="col">Double %</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="player in players"
              :key="player.id"
            >
              <th class="border-right" colspan="1" scope="row">{{ player.name }}</th>
              <td>{{ getPlayerMatchDartsAndRatio(player.id).matchDarts }}</td>
              <td>{{ getPlayerMatchDartsAndRatio(player.id).winningLegs }}</td>
              <td>{{ getPlayerMatchDartsAndRatio(player.id).ratio }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mx-2">
        <button
          class="btn btn-lg btn-warning btn-block"
          @click="backToHome"
        >
          <b>GG WP!</b>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Victory',

  computed: {
    winner() {
      return this.$store.getters.winner;
    },
        
    winnerName() {
      return this.winner.name;
    },

    currentRound() {
      return this.$store.getters.currentRound;
    },

    scores() {
      return this.$store.state.scores;
    },

    highscore() {
      const highscore = this.scores.reduce((prev, cur) => {
        const score = prev.scoreSum > cur.scoreSum ? prev : cur;
        return {
          scoreSum: score.scoreSum,
          playerId: score.playerId,
        };
      });

      return {
        score: highscore.scoreSum,
        playerId: highscore.playerId,
      };
    },

    checkoutScore() {
      return this.scores[this.scores.length-1].scoreSum;
    },

    highscorePlayer() {
      return this.$store.getters.getPlayerById(this.highscore.playerId);
    },

    activeGameMode() {
      return this.$store.getters.activeGameMode;
    },

    activeGameType() {
      return this.activeGameMode.type;
    },

    tournamentMode() {
      return this.activeGameMode.tournament;
    },

    players() {
      return this.$store.state.players;
    },
  },

  methods: {
    getHighShotOfPlayer(id, min, max) {
      return this.$store.getters.getHighshotsByIdAndValue(id, min, max).length;
    },

    getPlayerAverage(id) {
      return this.$store.getters.getPlayerAverageById(id);
    },

    getPlayerMatchDartsAndRatio(id) {
      return this.$store.getters.getMatchDartsAndRatio(id);
    },

    backToHome() {
      this.$router.push({ name: 'home' });
    },
  },
}
</script>

<style scoped>
    .alert-success {
        background: #4CAF50;
        color: #fff;
    }
</style>