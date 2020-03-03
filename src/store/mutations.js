export default {
    setActiveGameMode (state, id) {
        state.gameModes.map(mode => mode.active = false);
        state.gameModes.find(mode => mode.id == id).active = true;
    },

    setGameOption(state, option) {
        state.gameModes.map(mode => mode.option = option);
    },

    setNextPlayer(state) {
        const currentActivePlayerId = state.players.find(player => player.active).id;
        state.players.map(player => player.active = false);
        
        if (currentActivePlayerId == state.players.length) {
            state.players.find(player => player.id == 1).active = true;
            state.stats.rounds++;
        } else {
            state.players.find(player => player.id == currentActivePlayerId+1).active = true;
        }
    },

    startGame(state, payload) {
        state.players = [];

        for (let index = 0; index < payload.names.length; index++) {
            state.players.push({
                id: index+1,
                name: payload.names[index].name,
                score: payload.mode.score,
                active: index == 0 ? true : false,
                winner: false,
            });
        }

        // reset checkout hint
        state.checkoutHint = {};
    },

    setPlayerScore(state, payload) {
        const player = state.players.find(player => player.id == payload.activePlayerId);
        player.score -= payload.scoreSum;
    },

    setWinner(state, playerId) {
        const player = state.players.find(player => player.id == playerId);
        player.winner = true;
    },

    setHighScore(state, payload) {
        state.stats.highscore.score = payload.scoreSum;
        state.stats.highscore.playerId = payload.activePlayerId;
    },

    resetStats(state) {
        state.stats.rounds = 1;
        state.stats.highscore = { score: 0, playerId: 0 };
    },

    setCheckoutHint(state, hint) {
        state.checkoutHint = hint;
    },
};