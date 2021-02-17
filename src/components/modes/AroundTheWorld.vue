<template>
  <div>
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([1, 2, 3])"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([4, 5, 6])"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([7, 8, 9])"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([10, 11, 12])"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([13, 14, 15])"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="createButtonLine([16, 17, 18])"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        {
          name: '19',
          value: 19,
          disabled: (this.activePlayerScore+1 !== 19 || this.clickCount === 3),
          done: (this.activePlayerScore >= 19),
          active: !(this.activePlayerScore+1 !== 19|| this.clickCount === 3),
        },
        {
          name: '20',
          value: 20,
          disabled: (this.activePlayerScore+1 !== 20 || this.clickCount === 3),
          done: (this.activePlayerScore >= 20),
          active: !(this.activePlayerScore+1 !== 20|| this.clickCount === 3),
        },
        {
          name: 'Bull',
          value: 21,
          disabled: (this.activePlayerScore+1 !== 21 || this.clickCount === 3),
          done: (this.activePlayerScore >= 21),
          active: !(this.activePlayerScore+1 !== 21|| this.clickCount === 3),
        }
      ]"
      @scoreButtonClicked="scoreButtonClicked"
    />

    <ProgressBar />

    <div class="border mx-2 py-1">
        <p class="text-monospace mb-0">
          <span
            v-if="clicked.length"
            class="list-item"
          >
            {{ this.clicked.join(' - ') }}
          </span>
          <span v-else>
            - - -
          </span>
        </p>
    </div>

    <ActionBar
      :currentRound="currentRound"
      @accept="nextPlayer"
      @undo="undoLastShot"
    />

    <Snackbar ref="snackbar"/>
  </div>
</template>

<script>
import ScoreButtonsLine from "../scores/ScoreButtonsLine.vue";
import ProgressBar from "../scores/ProgressBar.vue";
import ActionBar from "../actionbar/ActionBar.vue";
import Snackbar from "../notifications/SnackBar.vue";

export default {
  name: 'AroundtheWorld',

  components: {
    ScoreButtonsLine,
    ProgressBar,
    ActionBar,
    Snackbar,
  },

  data() {
    return {
      clickCount: 0,
      clicked: [],
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

    currentRound() {
      return this.$store.state.stats.rounds;
    },
  },

  methods: {
    createButtonLine(ids) {
      return ids.map(id => {
        return {
          name: `${id}`,
          value: id,
          disabled: (this.activePlayerScore+1 !== id || this.clickCount === 3),
          done: (this.activePlayerScore >= id),
          active: !(this.activePlayerScore+1 !== id || this.clickCount === 3),
        }
      });
    },

    scoreButtonClicked(event) {
      if (this.clickCount < 3) {
        this.$store.dispatch('setPlayerScore', {
          score: 1,
          activePlayerId: this.activePlayerId,
        });

        this.clickCount++
        this.clicked.push(event.number.name);
      }
    },

    undoLastShot() {
      if (this.clickCount > 0) {
        this.$store.dispatch('setPlayerScore', {
          score: -1,
          activePlayerId: this.activePlayerId,
        });

        this.clickCount--
        this.clicked.pop();
      }
    },

    nextPlayer() {
      if (this.activePlayerScore === 21) {
        this.$emit('gameFinished');
        this.$store.dispatch('setWinner', this.activePlayerId);
        this.$router.push({ name: 'victory'});
        return;
      }

      this.clickCount = 0;
      this.clicked = [];
      this.$store.dispatch('setNextPlayer');
      this.$refs.snackbar.show(`Next player: ${this.activePlayer.name}`);
    },
  },
}
</script>