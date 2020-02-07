export default {
    gameModes: [
        { id: 1, name: '301', score: 301, active: true },
        { id: 2, name: '501', score: 501, active: false },
        { id: 3, name: '701', score: 701, active: false },
    ],

    players: [],
    stats: {
        rounds: 1,
        highscore: {
            score: 0,
            playerId: 0,
        },
    }
};