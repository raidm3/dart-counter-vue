<template>
  <div>
    <div v-if="legacyInputMode">
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
    </div>
    <div v-else>
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
        :scoreButtonNumbers="createButtonLine([0])"
        :scoreMultiplier="scoreMultiplier"
        @scoreButtonClicked="scoreButtonClicked"
      />
    </div>

    <ScoreLine
      :scores="scores"
      :showSum="true"
      :showRemainingScore="true"
      :showCheckoutHint="finishOption == 'doubleOut'"
    />

    <ActionBar
      :currentRound="currentRound"
      @accept="setPlayerScore"
      @undo="undo"
      @scoreRecorded="onScoreRecorded"
    />

    <button
      class="btn btn-link mb-2"
      type="button"
      @click="switchInputMode"
    >
      <font-awesome-icon v-if="legacyInputMode" :icon="['fas', 'toggle-on']" />
      <font-awesome-icon v-else :icon="['fas', 'toggle-off']" />
      Switch input mode
    </button>

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
      legacyInputMode: false,
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
          (
            this.finishOption == 'doubleOut'
            && (
              this.scores[this.scores.length-1].multiplier == 2
              || this.scores[this.scores.length-1].number.name == 'Bulls Eye'
              || !this.legacyInputMode
            )
          )
          || this.finishOption == 'singleOut'
        ) {
          this.$store.dispatch('setPlayerScore', {
            score: this.scoreSum,
            activePlayerId: this.activePlayerId,
            countRound: false,
          });

          // save scores in store
          this.$store.dispatch('addScore', {
            scoreSum: this.scoreSum,
            scores: this.scores,
            playerId: this.activePlayerId
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
          this.finishOption == 'doubleOut'
            && this.activePlayerScore - this.scoreSum === 1
        ) {
          this.$refs.snackbar.show('Throw over! :-(');
        } else {
          this.$store.dispatch('setPlayerScore', {
            score: this.scoreSum,
            activePlayerId: this.activePlayerId,
          });

          // save scores in store
          this.$store.dispatch('addScore', {
            scoreSum: this.scoreSum,
            scores: this.scores,
            playerId: this.activePlayerId
          });
        }
      }

      // reset local scores
      this.scores = [];
      this.scoreMultiplier = 1;

      // switch player
      this.$store.dispatch('setNextPlayer');
      this.$store.dispatch('setCheckoutHint', {});
      this.$refs.snackbar.show(`Next player: ${this.activePlayer.name}`);
    },

    scoreButtonClicked(event) {
      if (this.legacyInputMode) {
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
      } else {
        let value = this.scores[0]
          ? `${this.scores[0]?.number?.value}${event.number.value}`
          : `${event.number.value}`;

        let number = {
          number: {
            name: value,
            value: parseInt(value),
          },
          multiplier: 1,
        };
        this.scores = [number];
      }
    },

    scoreInputDone() {
      this.scores.push({ number: { name: `${this.value}`, value: this.value }, multiplier: 1 });
    },

    switchInputMode() {
      this.legacyInputMode = !this.legacyInputMode;
    },

    undoLastShot() {
      this.scores.pop();
    },

    undo() {
      if (this.scores.length > 0) {
        this.undoLastShot();
        return;
      }

      const scores = this.$store.state.scores;
      if (scores.length === 0) {
        return;
      }

      // set previous score, then delete from store
      this.scores = scores[scores.length-1].scores;
      this.$store.dispatch('undoLastScore');
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