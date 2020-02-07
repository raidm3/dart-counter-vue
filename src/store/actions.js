export default {
    setActiveGameMode({ commit }, id) {
        commit('setActiveGameMode', id);
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
};