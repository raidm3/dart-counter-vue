export default {
    gameModes: [
        { id: 1, name: '301', type: 'Classic', score: 301, option: 'singleOut', active: true },
        { id: 2, name: '501', type: 'Classic', score: 501, option: 'singleOut', active: false },
        { id: 3, name: '701', type: 'Classic', score: 701, option: 'singleOut', active: false },
        { id: 4, name: 'Around the World', type: 'AroundTheWorld', score: 0, active: false },
    ],

    players: [],

    checkoutHint: {},

    stats: {
        rounds: 1,
        highscore: {
            score: 0,
            playerId: 0,
        },
    }
};