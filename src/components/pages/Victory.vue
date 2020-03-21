<template>
    <div>
        <div class="alert alert-success" role="alert">
            <font-awesome-icon class="h1" :icon="['fas', 'trophy']" />
            <h5 class="alert-heading">Victory!</h5>
            <h3 class="font-weight-bold">
                {{ winnerName }}
            </h3>
            <span v-for="player in players" :key="player.id">
                {{ player.name }}: {{ player.score }} Points <br/>
            </span>

            <hr>

            <h5>Stats</h5>
            <p class="mb-1">
                Game has been finished in <b>Round {{ currentRound }}</b>
            </p>
            <p v-if="activeGameType === 'Classic'" class="mb-1">
                Best shot was <b>{{ highscore.score }}</b> from <b>{{ highscorePlayer.name }}</b>

                <span class="h5 d-block mt-2">Average Score</span>
                <span v-for="player in players" :key="player.id">
                    {{ player.name }}: 
                    <b>{{ calculateAverageScore(player.score, player.rounds) }}</b> Points <br/>
                </span>
            </p>
        </div>
        <div class="mx-2">
            <button
                class="btn btn-lg btn-primary btn-block"
                @click="rematch"
            >
                <b>Rematch</b>
            </button>
            <button
                class="btn btn-lg btn-secondary btn-block"
                @click="backToHome"
            >
                <b>Back to Home</b>
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
    },

    methods: {
        calculateAverageScore(score, rounds) {
            return Math.round((this.activeGameMode.score - score) / rounds * 100) / 100;
        },

        backToHome() {
            this.$router.push({ name: 'home' });
        },

        rematch() {
            const playerNames = this.$store.state.players.map(player => {
                return { id: player.id, name: player.name };
            });
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