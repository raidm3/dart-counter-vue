export default {
    activeGameMode: state => {
        return state.gameModes.find(mode => mode.active);
    },

    activePlayer: state => {
        return state.players.find(player => player.active);
    },

    getPlayerById: (state) => (id) => {
        return state.players.find(player => player.id == id);
    },

    winner: state => state.players.find(player => player.winner),

    numberOfPlayers: state => state.players.length,

    currentRound: state => state.stats.rounds,

    highscore: state => state.stats.highscore,
};