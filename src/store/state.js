export default {
  gameModes: [
    { id: 1, name: '301', type: 'Classic', score: 301, option: 'doubleOut', active: true },
    { id: 2, name: '501', type: 'Classic', score: 501, option: 'doubleOut', active: false },
    { id: 3, name: '701', type: 'Classic', score: 701, option: 'doubleOut', active: false },
    { id: 4, name: 'Around the World', type: 'AroundTheWorld', score: 0, active: false },
    { id: 5, name: 'Cricket', type: 'Cricket', score: 0, active: false },
  ],

  players: [],

  scores: [],

  checkoutHint: {},

  stats: {
    rounds: 1,
  }
};