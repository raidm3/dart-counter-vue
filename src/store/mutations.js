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

  setPreviousPlayer(state) {
    const currentActivePlayerId = state.players.find(player => player.active).id;
    state.players.map(player => player.active = false);
        
    if (currentActivePlayerId == 1) {
      state.players.find(player => player.id == state.players.length).active = true;
      state.stats.rounds--;
    } else {
      state.players.find(player => player.id == currentActivePlayerId-1).active = true;
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
        started: index == 0 ? true : false,
        winner: false,
        sets: 0,
        legs: 0,
      });
    }

    // reset checkout hint
    state.checkoutHint = {};
  },

  nextGameRound(state, activeGameMode) {
    state.players.forEach((player) => {
      player.score = activeGameMode.score;
      player.active = !player.started;
      player.started = !player.started;
      player.rounds = 0;
    });
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

  addScore(state, payload) {
    state.scores.push(payload);
  },

  undoLastScore(state) {
    let score = state.scores.pop();

    this.commit('addPlayerScore', {
      activePlayerId: score.playerId, 
      score: score.scoreSum,
    });
  },

  setWinner(state, playerId) {
    const player = state.players.find(player => player.id == playerId);
    player.winner = true;
  },

  setWinnerLegs(state, playerId) {
    const player = state.players.find(player => player.id == playerId);
    player.legs = player.legs + 1;

    if (player.legs === 3) {
      player.sets = player.sets + 1;

      state.players.forEach((player) => {
        player.legs = 0;
      });
    }

    if (player.sets === 3) {
      this.commit('setWinner', playerId);
    }
  },

  setHighScore(state, payload) {
    state.stats.highscore.score = payload.score;
    state.stats.highscore.playerId = payload.activePlayerId;
  },

  resetStats(state) {
    state.stats.rounds = 1;
  },

  resetScores(state) {
    state.scores = [];
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
};