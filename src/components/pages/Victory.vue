<template>
    <div>
        <div class="alert alert-success" role="alert">
            <h5 class="alert-heading">Victory!</h5>
            <h3 class="font-weight-bold">{{ winnerName }}</h3>
            <hr>
            <h5>Stats:</h5>
            <p class="mb-1">
                Game has been finished in <b>Round {{ currentRound }}</b>
            </p>
            <p v-if="activeGameType === 'Classic'" class="mb-1">
                Best shot was <b>{{ highscore.score }}</b> from <b>{{ highscorePlayer.name }}</b>
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

        activeGameType() {
            return this.$store.getters.activeGameMode.type;
        },
    },

    methods: {
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