<template>
  <div>
    <ScoreMultipliers
        @scoreMultiplierChanged="setScoreMultiplier"
        :scoreMultiplier="scoreMultiplier"
    />

    <div class="row m-2">
      <div class="col-4">
        <div
          v-for="hit in players[0].hits"
          :key="hit.id"
          style="height: 38px; margin-bottom: 8px; padding: 5px;"
        >
           <div class="inning" :class="{ 'circle': hit.counter >= 3 }">
             <div :class="{ 'firstLine': hit.counter >= 1 }"></div>
             <div :class="{ 'secondLine': hit.counter >= 2 }"></div>
           </div>
        </div>
      </div>
      <div class="col-4">
        <ScoreButton
          v-for="hit in players[0].hits"
          :key="hit.id"
          :number="{
            name: hit.id === 25 ? 'Bull' : `${hit.id}`,
            value: hit.id,
            disabled: isScoreClosed(hit.id) || scores.length === 3 ||
              (hit.id === 25 && scoreMultiplier === 3)
          }"
          :big="false"
          :scoreMultiplier="scoreMultiplier"
          @scoreButtonClicked="setHit"
        />
      </div>
      <div class="col-4">
        <div
          v-for="hit in players[1].hits"
          :key="hit.id"
          style="height: 38px; margin-bottom: 8px; padding: 5px;"
        >
           <div class="inning" :class="{ 'circle': hit.counter >= 3 }">
             <div :class="{ 'firstLine': hit.counter >= 1 }"></div>
             <div :class="{ 'secondLine': hit.counter >= 2 }"></div>
           </div>
        </div>
      </div>
    </div>

    <ScoreLine
      class="mb-2"
      :scores="scores"
      :showSum="false"
      :showRemainingScore="false"
      :showCheckoutHint="false"
    />

    <ActionBar
      :currentRound="currentRound"
      @accept="nextPlayer"
      @undo="undoLastShot"
    />
  </div>
</template>

<script>
import ScoreMultipliers from '../scores/ScoreMultipliers.vue';
import ScoreButton from '../scores/ScoreButton.vue';
import ScoreLine from "../scores/ScoreLine.vue";
import ActionBar from '../actionbar/ActionBar.vue';

export default {
  name: 'Cricket',

  components: {
    ScoreMultipliers,
    ScoreButton,
    ScoreLine,
    ActionBar,
  },

  data() {
    return {
      scores: [],
      scoreMultiplier: 1,
      players: [
        {
          id: 1,
          score: 0,
          hits: [
            { id: 15, counter: 0 },
            { id: 16, counter: 0 },
            { id: 17, counter: 0 },
            { id: 18, counter: 0 },
            { id: 19, counter: 0 },
            { id: 20, counter: 0 },
            { id: 25, counter: 0 },
          ],
        },
        {
          id: 2,
          score: 0,
          hits: [
            { id: 15, counter: 0 },
            { id: 16, counter: 0 },
            { id: 17, counter: 0 },
            { id: 18, counter: 0 },
            { id: 19, counter: 0 },
            { id: 20, counter: 0 },
            { id: 25, counter: 0 },
          ],
        },
      ],
    };
  },

  computed: {
    currentRound() {
      return this.$store.state.stats.rounds;
    },

    activePlayerId() {
      return this.$store.getters.activePlayer.id;
    },

    activePlayer() {
      return this.players[this.activePlayerId - 1];
    },

    activePlayerHits() {
      return this.activePlayer.hits;
    },

    activePlayerScore: {
      get() {
        return this.activePlayer.score;
      },
      set(value) {
        this.activePlayer.score = value;
      }
    },
  },

  methods: {
    setScoreMultiplier(event) {
      this.scoreMultiplier = event;
    },

    isScoreClosed(value) {
      const result = this.players.filter(player => {
        const hit = player.hits.find(hit => hit.id === value);
        return hit.counter >= 3;
      });

      return result.length === this.players.length;
    },

    setHit(event) {
      let overthrowed = false;
      const activePlayerHit = this.activePlayerHits.find(
        hit => hit.id === event.number.value
      );

      if (activePlayerHit.counter === 3) {
        this.activePlayerScore += event.number.value * event.multiplier;
      }

      if (activePlayerHit.counter + event.multiplier <= 3) {
        activePlayerHit.counter += event.multiplier;
      } else {
        overthrowed = true;
      }

      this.scores.push({ ...event, overthrowed });

      this.scoreMultiplier = 1;
    },

    undoLastShot() {
      const lastHit = this.scores.pop();

      if (lastHit) {
        const activePlayerHit = this.activePlayerHits.find(
          hit => hit.id === lastHit.number.value
        );

        if (!lastHit.overthrowed) {
          activePlayerHit.counter -= lastHit.multiplier;
        }

        if (activePlayerHit.counter >= 3) {
          this.activePlayerScore -= lastHit.number.value * lastHit.multiplier;
        }
      }

      this.scoreMultiplier = 1;
    },

    nextPlayer() {
      // Add score to player score
      this.$store.dispatch('setPlayerScore', {
          score: this.activePlayerScore,
          activePlayerId: this.activePlayerId,
      });

      // Check winning conditions and finish game if fulfilled
      if (this.checkIfActivePlayerHasWon()) {
        this.$store.dispatch('setWinner', this.activePlayerId);

        this.$emit('gameFinished');

        this.$router.push({ name: 'victory'});
        return;
      }

      // Reset local values and switch to next player
      this.scores = [];
      this.scoreMultiplier = 1;
      this.$store.dispatch('setNextPlayer');
    },

    checkIfActivePlayerHasWon() {
      if (this.activePlayerHits.filter(hit => (hit.counter >= 3)).length !== 7) {
        return false;
      }

      const highestScore = this.players
        .map(player => player.score)
        .reduce((total, currentValue) => (total > currentValue ? total : currentValue));

      if (highestScore > this.activePlayerScore) {
        return false;
      }

      return true;
    },
  },
}
</script>

<style scoped>
.inning {
  margin: auto;
  position: relative;
  width: 28px;
  height: 28px;
  opacity: 0.7;;
}
.circle {
  border: 2px solid #333;
  border-radius: 50%
}
.firstLine:before {
  position: absolute;
  left: 11px;
  content: ' ';
  height: 25px;
  width: 2px;
  background-color: #333;
}
.firstLine:before {
  transform: rotate(45deg);
}
.secondLine:after {
  position: absolute;
  left: 11px;
  content: ' ';
  height: 25px;
  width: 2px;
  background-color: #333;
}
.secondLine:after {
  transform: rotate(-45deg);
}


</style>