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
            commit('substractPlayerScore', payload);
            commit('countRound', payload);
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
        commit('startGame', payload);
        commit('resetStats');
    },

    setCheckoutHint({ commit }, hint) {
        commit('setCheckoutHint', hint);
    },
};