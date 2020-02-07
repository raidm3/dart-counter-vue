<template>
    <div>
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Victory!</h4>
            <p class="font-weight-bold">{{ winnerName }}</p>
            <hr>
            <h5>Stats:</h5>
            <p class="mb-1">
                Game has been finished in <b>Round {{ currentRound }}</b>
            </p>
            <p class="mb-1">
                Best shot was <b>{{ highscore.score }}</b> from <b>{{ highscorePlayer.name }}</b>
            </p>
        </div>
        <button
            class="btn btn-primary btn-block"
            @click="rematch()"
        >
            <b>Rematch</b>
        </button>
        <button
            class="btn btn-secondary btn-block"
            @click="backToHome()"
        >
            <b>Back to Home</b>
        </button>
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
    },

    methods: {
        backToHome() {
            this.$router.push({ name: 'home' });
        },

        rematch() {
            const playerNames = this.$store.state.players.map(player => player.name);
            const gameMode = this.$store.getters.activeGameMode;

            this.$store.dispatch('startGame', {
                names: playerNames,
                mode: gameMode,
            });
            this.$router.push({ name: 'play', params: { mode: gameMode.name } });
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