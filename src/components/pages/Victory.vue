<template>
    <div>
        <div class="alert alert-success" role="alert">
            <font-awesome-icon class="h1" :icon="['fas', 'trophy']" />
            <h5 class="alert-heading">Victory!</h5>
            <h3 class="font-weight-bold">
                {{ winnerName }}
            </h3>

            <div v-if="activeGameType !== 'Classic'">
                <span v-for="player in players" :key="player.id">
                    <span>{{ player.name }}:</span>
                    <span class="font-weight-bold pl-2">{{ player.score }} Points</span>
                    <br/>
                </span>
            </div>

            <hr>

            <h5>Stats</h5>
            <p class="mb-1">
                Game has been finished in <b>Round {{ currentRound }}</b>
            </p>
            <div v-if="activeGameType === 'Classic'" class="mb-1">
                Best shot was <b>{{ highscore.score }}</b> from <b>{{ highscorePlayer.name }}</b>

                <hr>

                <span class="h5 d-block mt-2">Points</span>
                <table class="table table-borderless table-sm text-white">
                    <thead>
                        <tr class="border-bottom">
                            <th class="border-right" colspan="1" scope="col"></th>
                            <th scope="col">&#8960; Score</th>
                            <th scope="col">60+</th>
                            <th scope="col">100+</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="player in players"
                            :key="player.id"
                        >
                            <th class="border-right" colspan="1" scope="row">{{ player.name }}</th>
                            <td>⌀ {{ player.average }}</td>
                            <td>{{ getHighShotOfPlayer(player.id, 'sixty') }}x</td>
                            <td>{{ getHighShotOfPlayer(player.id, 'hundred') }}x</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mx-2">
            <button
                class="btn btn-lg btn-primary btn-block"
                @click="backToHome"
            >
                <b>Play Again!</b>
            </button>
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

    highscore() {
      return this.$store.getters.highscore;
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

    players() {
      return this.$store.state.players;
    },

    highShots() {
      return this.$store.state.stats.highShots;
    },
  },

  methods: {
    getHighShotOfPlayer(id, type) {
      return this.highShots[type].find(shot => shot.playerId == id).count;
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