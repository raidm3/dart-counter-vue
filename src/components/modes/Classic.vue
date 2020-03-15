<template>
  <div>
    <ScoreMultipliers
        @scoreMultiplierChanged="setScoreMultiplier"
        :scoreMultiplier="scoreMultiplier"
    />

    <ScoreButtonsLine
        :scoreButtonNumbers="[
            {name: '1', value: 1},
            {name: '2', value: 2},
            {name: '3', value: 3},
            {name: '4', value: 4},
        ]"
        :scoreMultiplier="scoreMultiplier"
        @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
        :scoreButtonNumbers="[
            {name: '5', value: 5},
            {name: '6', value: 6},
            {name: '7', value: 7},
            {name: '8', value: 8},
        ]"
        :scoreMultiplier="scoreMultiplier"
        @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
        :scoreButtonNumbers="[
            {name: '9', value: 9},
            {name: '10', value: 10},
            {name: '11', value: 11},
            {name: '12', value: 12},
        ]"
        :scoreMultiplier="scoreMultiplier"
        @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
        :scoreButtonNumbers="[
            {name: '13', value: 13},
            {name: '14', value: 14},
            {name: '15', value: 15},
            {name: '16', value: 16},
        ]"
        :scoreMultiplier="scoreMultiplier"
        @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
        :scoreButtonNumbers="[
            {name: '17', value: 17},
            {name: '18', value: 18},
            {name: '19', value: 19},
            {name: '20', value: 20},
        ]"
        :scoreMultiplier="scoreMultiplier"
        @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
        :scoreButtonNumbers="[
            {name: 'Bull', value: 25},
            {name: 'Bulls Eye', value: 50},
            {name: 'Classico', value: 26},
        ]"
        @scoreButtonClicked="scoreButtonClicked"
    />

    <ScoreLine
        :scores="scores"
        :scoreSum="scoreSum"
        :activePlayerScore="activePlayerScore"
    />

    <div class="row m-2">
        <div class="col-6 px-2">
            <button class="btn btn-lg btn-block btn-danger" @click="undoLastScore">
                <b>Undo</b>
                <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'undo']" />
            </button>
        </div>
        <div class="col-6 px-2">
            <button class="btn btn-lg btn-block btn-success" @click="setPlayerScore">
                <b>Accept</b>
            <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'check']" />
            </button>
        </div>
        <button class="btn btn-block btn-link mt-2" @click="quitGame">
            <b>Quit Game</b>
            <font-awesome-icon class="ml-2" :icon="['fas', 'sign-out-alt']" />
        </button>
    </div>

    <Snackbar ref="snackbar"/>
  </div>
</template>

<script>
import ScoreMultipliers from "../scores/ScoreMultipliers.vue";
import ScoreButtonsLine from "../scores/ScoreButtonsLine.vue";
import ScoreLine from "../scores/ScoreLine.vue";
import Snackbar from "../notifications/SnackBar.vue";

export default {
  name: 'Classic',

  components: {
    ScoreMultipliers,
    ScoreButtonsLine,
    ScoreLine,
    Snackbar,
  },

  data() {
    return {
      scores: [],
      scoreMultiplier: 1,
    };
  },

  computed: {
    activePlayer() {
      return this.$store.getters.activePlayer;
    },

    activePlayerId() {
      return this.activePlayer.id;
    },

    activePlayerScore() {
      return this.activePlayer.score;
    },

    activeGameMode() {
      return this.$store.getters.activeGameMode;
    },

    activeGameType() {
      return this.activeGameMode.type;
    },

    finishOption() {
      return this.activeGameMode.option;
    },

    scoreSum() {
      let sum = 0;

      this.scores.forEach((item) => {
          sum += (item.number.value * item.multiplier);
      });

      return sum;
    },
  },

  methods: {
    setPlayerScore() {
        // VICTORY
        if (this.activePlayerScore == this.scoreSum) {
            if (
                this.finishOption == 'doubleOut' &&
                (
                    this.scores[this.scores.length-1].multiplier == 2 ||
                    this.scores[this.scores.length-1].number.name == 'Bulls Eye'
                )
            ) {
                this.$store.dispatch('setPlayerScore', {
                    score: this.scoreSum,
                    activePlayerId: this.activePlayerId,
                });

                this.$store.dispatch('setWinner', this.activePlayerId);

                this.$emit('gameFinished');

                this.$router.push({ name: 'victory'});
                return;
            } else if(this.finishOption == 'singleOut') {
                this.$store.dispatch('setPlayerScore', {
                    score: this.scoreSum,
                    activePlayerId: this.activePlayerId,
                });

                this.$store.dispatch('setWinner', this.activePlayerId);

                this.$emit('gameFinished');

                this.$router.push({ name: 'victory'});
                return;
            } else {
                this.$refs.snackbar.show('Throw over! :-(');
            }
        }

        // THROW OVER
        if (this.activePlayerScore < this.scoreSum) {
            this.$refs.snackbar.show('Throw over! :-(');
        }

        // set player score
        if (this.activePlayerScore > this.scoreSum) {
            if (
                this.finishOption == 'doubleOut' &&
                this.activePlayerScore - this.scoreSum === 1
            ) {
                this.$refs.snackbar.show('Throw over! :-(');
            } else {
                this.$store.dispatch('setPlayerScore', {
                    score: this.scoreSum,
                    activePlayerId: this.activePlayerId,
                });
            }
        }

        // reset current scores
        this.scores = [];
        this.scoreMultiplier = 1;

        // switch player
        this.$store.dispatch('setNextPlayer');
        this.$store.dispatch('setCheckoutHint', {});
    },

    scoreButtonClicked(event) {
      if (this.scores.length < 3) {
          if (event.number.name == 'Classico') {
            this.scores = [
                { number: { name: '5', value: 5 }, multiplier: 1 },
                { number: { name: '20', value: 20 }, multiplier: 1 },
                { number: { name: '1', value: 1 }, multiplier: 1 },
            ];
          } else {
            this.scores.push(event);
          }
      }
      this.scoreMultiplier = 1;
    },

    undoLastScore() {
      this.scores.pop();
    },

    setScoreMultiplier(event) {
      this.scoreMultiplier = event;
    },

    quitGame() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>