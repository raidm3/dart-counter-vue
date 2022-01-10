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

  getPlayers: (state) => {
    return state.players || [];
  },

  getScoresByPlayerId: (state) => (id) => {
    return state.scores.filter((score) => score.playerId === id);
  },

  getPlayerAverageById: (state, getters) => (id) => {
    const scores = getters.getScoresByPlayerId(id);

    if (scores.length == 0) {
      return '0';
    }

    const result = scores.reduce((prev, cur) => ({ scoreSum: prev.scoreSum + cur.scoreSum }));
    return (Math.round((result.scoreSum / scores.length) * 100) / 100).toFixed(2);
  },

  getHighshotsByIdAndValue: (state, getters) => (id, min, max) => {
    const scores = getters.getScoresByPlayerId(id);

    if (scores.length == 0) {
      return 0;
    }

    return scores.filter((score) => score.scoreSum >= min && score.scoreSum <= max);
  },

  winner: state => state.players.find(player => player.winner),

  numberOfPlayers: state => state.players.length,

  currentRound: state => state.stats.rounds,
};