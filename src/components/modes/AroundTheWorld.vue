<template>
  <div>
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        { name: '1', value: 1, disabled: isButtonDisabled(1), done: (activePlayerScore >= 1) },
        { name: '2', value: 2, disabled: isButtonDisabled(2), done: (activePlayerScore >= 2) },
        { name: '3', value: 3, disabled: isButtonDisabled(3), done: (activePlayerScore >= 3) },
        { name: '4', value: 4, disabled: isButtonDisabled(4), done: (activePlayerScore >= 4) },
      ]"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        { name: '5', value: 5, disabled: isButtonDisabled(5), done: (activePlayerScore >= 5) },
        { name: '6', value: 6, disabled: isButtonDisabled(6), done: (activePlayerScore >= 6) },
        { name: '7', value: 7, disabled: isButtonDisabled(7), done: (activePlayerScore >= 7) },
        { name: '8', value: 8, disabled: isButtonDisabled(8), done: (activePlayerScore >= 8) },
      ]"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        { name: '9', value: 9, disabled: isButtonDisabled(9), done: (activePlayerScore >= 9) },
        { name: '10', value: 10, disabled: isButtonDisabled(10), done: (activePlayerScore >= 10) },
        { name: '11', value: 11, disabled: isButtonDisabled(11), done: (activePlayerScore >= 11) },
        { name: '12', value: 12, disabled: isButtonDisabled(12), done: (activePlayerScore >= 12) },
      ]"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        { name: '13', value: 13, disabled: isButtonDisabled(13), done: (activePlayerScore >= 13) },
        { name: '14', value: 14, disabled: isButtonDisabled(14), done: (activePlayerScore >= 14) },
        { name: '15', value: 15, disabled: isButtonDisabled(15), done: (activePlayerScore >= 15) },
        { name: '16', value: 16, disabled: isButtonDisabled(16), done: (activePlayerScore >= 16) },
      ]"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        { name: '17', value: 17, disabled: isButtonDisabled(17), done: (activePlayerScore >= 17) },
        { name: '18', value: 18, disabled: isButtonDisabled(18), done: (activePlayerScore >= 18) },
        { name: '19', value: 19, disabled: isButtonDisabled(19), done: (activePlayerScore >= 19) },
        { name: '20', value: 20, disabled: isButtonDisabled(20), done: (activePlayerScore >= 20) },
      ]"
      @scoreButtonClicked="scoreButtonClicked"
    />
    <ScoreButtonsLine
      :scoreButtonNumbers="[
        { name: 'Bull', value: 21, disabled: isButtonDisabled(21), done: (activePlayerScore >= 21) },
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
            {{ this.clicked.join(', ') }}
          </span>
          <span v-else>
            - - -
          </span>
        </p>
    </div>

    <div class="row m-2">
      <div class="col-6 px-2">
        <button class="btn btn-lg btn-block btn-danger" @click="undoLastScore">
          <b>Undo</b>
          <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'undo']" />
        </button>
      </div>
      <div class="col-6 px-2">
        <button class="btn btn-lg btn-block btn-success" @click="nextPlayer">
          <b>Accept</b>
        <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'check']" />
        </button>
      </div>
      <button class="btn btn-block btn-link mt-2" @click="quitGame">
        <b>Quit Game</b>
        <font-awesome-icon class="ml-2" :icon="['fas', 'sign-out-alt']" />
      </button>
    </div>
  </div>
</template>

<script>
import ScoreButtonsLine from "../scores/ScoreButtonsLine.vue";
import ProgressBar from "../scores/ProgressBar.vue";

export default {
  name: 'AroundtheWorld',

  components: {
    ScoreButtonsLine,
    ProgressBar,
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
  },

  methods: {
    isButtonDisabled(id) {
      return (this.activePlayerScore+1 !== id || this.clickCount === 3);
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

    undoLastScore() {
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
    },
    
    quitGame() {
      this.$router.push({ path: '/' });
    },
  },
}
</script>