<template>
    <div>
        <PlayersHeader/>

        <ScoreMultipliers
            @scoreMultiplierChanged="setScoreMultiplier"
            :scoreMultiplier="scoreMultiplier"
        />

        <ScoreButtonsLine
            :scoreButtonNumbers="[1, 2, 3, 4]"
            :scoreMultiplier="scoreMultiplier"
            @scoreButtonClicked="scoreButtonClicked"
        />
        <ScoreButtonsLine
            :scoreButtonNumbers="[5, 6, 7, 8]"
            :scoreMultiplier="scoreMultiplier"
            @scoreButtonClicked="scoreButtonClicked"
        />
        <ScoreButtonsLine
            :scoreButtonNumbers="[9, 10, 11, 12]"
            :scoreMultiplier="scoreMultiplier"
            @scoreButtonClicked="scoreButtonClicked"
        />
        <ScoreButtonsLine
            :scoreButtonNumbers="[13, 14, 15, 16]"
            :scoreMultiplier="scoreMultiplier"
            @scoreButtonClicked="scoreButtonClicked"
        />
        <ScoreButtonsLine
            :scoreButtonNumbers="[17, 18, 19, 20]"
            :scoreMultiplier="scoreMultiplier"
            @scoreButtonClicked="scoreButtonClicked"
        />
        <ScoreButtonsLine
            :scoreButtonNumbers="[25, 50, 26]"
            @scoreButtonClicked="scoreButtonClicked"
        />

        <ScoreLine :scores="scores" :scoreSum="scoreSum"/>

        <div class="mx-2">
            <button
                class="btn btn-block btn-success"
                @click="setPlayerScore()"
            >
                <b>Accept</b>
            </button>
            <button
                class="btn btn-block btn-danger"
                @click="undoLastScore()"
            >
                <b>Undo</b>
            </button>
        </div>
        <Snackbar ref="snackbar"/>
    </div>
</template>

<script>
import PlayersHeader from "../PlayersHeader.vue";
import ScoreMultipliers from "../ScoreMultipliers.vue";
import ScoreButtonsLine from "../ScoreButtonsLine.vue";
import ScoreLine from "../ScoreLine.vue";
import Snackbar from "../SnackBar.vue";

export default {
    name: 'Play',

    components: {
        PlayersHeader,
        ScoreMultipliers,
        ScoreButtonsLine,
        ScoreLine,
        Snackbar,
    },

    data() {
        return {
            scores: [],
            scoreMultiplier: 1,
            gameFinished: false,
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

        scoreSum() {
            return this.scores.length ? this.scores.reduce((sum, score) => sum += score) : 0;
        }
    },

    methods: {
        setPlayerScore() {
            // VICTORY
            if (this.activePlayerScore == this.scoreSum) {
                this.$store.dispatch('setPlayerScore', {
                    scoreSum: this.scoreSum,
                    activePlayerId: this.activePlayerId,
                });

                this.$store.dispatch('setWinner', this.activePlayerId);

                this.gameFinished = true;

                this.$router.push({ name: 'victory'});
                return;
            }

            // THROW OVER
            if (this.activePlayerScore < this.scoreSum) {
                this.$refs.snackbar.show('Throw over! :-(');
            }

            // set player score
            if (this.activePlayerScore > this.scoreSum) {
                this.$store.dispatch('setPlayerScore', {
                    scoreSum: this.scoreSum,
                    activePlayerId: this.activePlayerId,
                });
            }

            // reset current scores
            this.scores = [];
            this.scoreMultiplier = 1;

            // switch player
            this.$store.dispatch('setNextPlayer');
        },

        scoreButtonClicked(event) {
            if (this.scores.length < 3) {
                this.scores.push(event);
            }
        },

        undoLastScore() {
            this.scores.pop();
        },

        setScoreMultiplier(event) {
            this.scoreMultiplier = event;
        }
    },

    beforeRouteLeave (to, from, next) {
        if (!this.gameFinished) {
            const answer = window.confirm('Do you really want to quit the game?');
            if (answer) {
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    },
}
</script>