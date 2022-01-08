export default {
  gameModes: [
    { id: 1, name: '301', type: 'Classic', score: 301, option: 'doubleOut', active: true, tournament: false },
    { id: 2, name: '501', type: 'Classic', score: 501, option: 'doubleOut', active: false, tournament: false },
    { id: 3, name: '701', type: 'Classic', score: 701, option: 'doubleOut', active: false, tournament: false },
    { id: 4, name: 'First to 3 Sets', type: 'Classic', score: 501, option: 'doubleOut', active: false, tournament: true },
    { id: 5, name: 'Around the World', type: 'AroundTheWorld', score: 0, active: false, tournament: false },
    { id: 6, name: 'Cricket', type: 'Cricket', score: 0, active: false, tournament: false },
  ],

  players: [],

  scores: [],

  checkoutHint: {},

  stats: {
    rounds: 1,
  }
};