<template>
  <div>
    <ScoreMultipliers
        @scoreMultiplierChanged="setScoreMultiplier"
        :scoreMultiplier="scoreMultiplier"
    />

    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([1, 2, 3])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([4, 5, 6])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([7, 8, 9])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([10, 11, 12])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([13, 14, 15])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([16, 17, 18])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([19, 20, 25])"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <!-- <ScoreButtonsLine
      :scoreButtonNumbers="[
          { name: 'Bull', value: 25, disabled: this.scores.length === 3, done: false, active: false },
          { name: 'Bulls Eye', value: 50, disabled: this.scores.length === 3, done: false, active: false },
          { name: 'Classico', value: 26, disabled: this.scores.length === 3, done: false, active: false },
      ]"
      :scoreMultiplier="scoreMultiplier"
      @scoreButtonClicked="scoreButtonClicked"
    /> -->

    <ScoreLine
        :scores="scores"
        :showSum="true"
        :showRemainingScore="true"
        :showCheckoutHint="finishOption == 'doubleOut'"
    />

    <ActionBar
      :currentRound="currentRound"
      @accept="setPlayerScore"
      @undo="undoLastShot"
      @scoreRecorded="onScoreRecorded"
    />

    <Snackbar ref="snackbar"/>
  </div>
</template>

<script>
import ScoreMultipliers from "../scores/ScoreMultipliers.vue";
import ScoreButtonsLine from "../scores/ScoreButtonsLine.vue";
import ScoreLine from "../scores/ScoreLine.vue";
import ActionBar from "../actionbar/ActionBar.vue";
import Snackbar from "../notifications/SnackBar.vue";

export default {
  name: 'Classic',

  components: {
    ScoreMultipliers,
    ScoreButtonsLine,
    ScoreLine,
    ActionBar,
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

    currentRound() {
      return this.$store.state.stats.rounds;
    },
  },

  methods: {
    createButtonLine(ids) {
      return ids.map(id => {
        return {
          name: id === 25 ? 'Bull' : `${id}`,
          value: id,
          disabled: this.scores.length === 3,
          done: false,
          active: false,
        }
      });
    },

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
      this.$refs.snackbar.show(`Next player: ${this.activePlayer.name}`);
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

    undoLastShot() {
      this.scores.pop();
    },

    onScoreRecorded(event) {
      if (this.scores.length < 3) {
        this.scores.push(event);
      }
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