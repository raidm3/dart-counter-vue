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
        commit('setPlayerScore', payload);

        if (getters.highscore.score < payload.scoreSum) {
            commit('setHighScore', payload);
        }
    },

    setWinner({ commit }, playerId) {
        commit('setWinner', playerId);
    },

    startGame({ commit }, payload) {
        commit('startGame', payload);
    },

    resetStats({ commit }) {
        commit('resetStats');
    },

    setCheckoutHint({ commit }, hint) {
        commit('setCheckoutHint', hint);
    },
};