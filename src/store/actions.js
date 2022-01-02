export default {
  setActiveGameMode({ commit }, id) {
    commit('setActiveGameMode', id);
  },

  setGameOption({ commit }, option) {
    commit('setGameOption', option);
  },

  setNextPlayer({ commit }) {
    commit('setNextPlayer');
  },

  setPlayerScore({ commit, getters }, payload) {
    const { countRound = true } = payload;

    if (getters.activeGameMode.type === 'Classic') {
      commit('substractPlayerScore', {
        currentRound: getters.currentRound,
        gameModeScore: getters.activeGameMode.score,
        ...payload
      });
      
      if (countRound) {
        commit('countRound', payload);
      }
    }

    if (getters.activeGameMode.type === 'AroundTheWorld') {
      commit('addPlayerScore', payload);
    }

    if (getters.activeGameMode.type === 'Cricket') {
      commit('setPlayerScore', payload);
    }
  },

  addScore({ commit }, score) {
    commit('addScore', score);
  },

  undoLastScore({ commit }) {
    commit('undoLastScore');
    commit('setPreviousPlayer');
  },

  setWinner({ commit }, playerId) {
    commit('setWinner', playerId);
  },

  startGame({ commit }, payload) {
    commit('resetStats');
    commit('resetScores');
    commit('startGame', payload);
  },

  setCheckoutHint({ commit }, hint) {
    commit('setCheckoutHint', hint);
  },
};