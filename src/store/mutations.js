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

            state.stats.highShots.sixty.push({
                playerId: index+1,
                count: 0,
            });

            state.stats.highShots.hundred.push({
                playerId: index+1,
                count: 0,
            });
        }

        // reset checkout hint
        state.checkoutHint = {};
    },

    substractPlayerScore(state, payload) {
        const player = state.players.find(player => player.id == payload.activePlayerId);
        player.score -= payload.score;
    },

    addPlayerScore(state, payload) {
        const player = state.players.find(player => player.id == payload.activePlayerId);
        player.score += payload.score;
    },

    setPlayerScore(state, payload) {
        const player = state.players.find(player => player.id == payload.activePlayerId);
        player.score = payload.score;
    },

    setWinner(state, playerId) {
        const player = state.players.find(player => player.id == playerId);
        player.winner = true;
    },

    setHighScore(state, payload) {
        state.stats.highscore.score = payload.score;
        state.stats.highscore.playerId = payload.activePlayerId;
    },

    resetStats(state) {
        state.stats.rounds = 1;
        state.stats.highscore = { score: 0, playerId: 0 };
    },

    setCheckoutHint(state, hint) {
        state.checkoutHint = hint;
    },

    countRound(state, payload) {
        const player = state.players.find(player => player.id == payload.activePlayerId);

        if (player.rounds) {
            player.rounds++;
        } else {
            player.rounds = 1;
        }
    },

    countHighShots(state, payload) {
        const highShots = state.stats.highShots;

        if (payload.score > 60) {
            highShots.sixty.find(
                playerStats => playerStats.playerId == payload.activePlayerId
            ).count++;
        }

        if (payload.score > 100) {
            highShots.hundred.find(
                playerStats => playerStats.playerId == payload.activePlayerId
            ).count++;
        }
    },
};