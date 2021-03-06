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
    if (getters.activeGameMode.type === 'Classic') {
      commit('substractPlayerScore', {
        currentRound: getters.currentRound,
        gameModeScore: getters.activeGameMode.score,
        ...payload
      });
      commit('countRound', payload);
            
      if (payload.score >= 60) {
        commit('countHighShots', payload);
      }
    }

    if (getters.activeGameMode.type === 'AroundTheWorld') {
      commit('addPlayerScore', payload);
    }

    if (getters.activeGameMode.type === 'Cricket') {
      commit('setPlayerScore', payload);
    }

    if (getters.highscore.score < payload.score) {
      commit('setHighScore', payload);
    }
  },

  setWinner({ commit }, playerId) {
    commit('setWinner', playerId);
  },

  startGame({ commit }, payload) {
    commit('resetStats');
    commit('startGame', payload);
  },

  setCheckoutHint({ commit }, hint) {
    commit('setCheckoutHint', hint);
  },
};