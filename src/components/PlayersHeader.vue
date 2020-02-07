<template>
    <div class="mx-2">
        <div class="row">
            <div
                v-if="numberOfPlayers <= 2"
                class="col-12"
            >
                <li
                    v-for="player in players"
                    :key="player.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                    :class="activePlayer.id == player.id ? 'active': ''"
                >
                    <b>{{ player.name }}</b>
                    <span class="badge badge-warning">{{ player.score }}</span>
                </li>
            </div>
            <div
                v-else
                v-for="(column, i) in splitPlayers"
                :key="i"
                :class="columnClass(i)"
            >
                <li
                    v-for="player in column"
                    :key="player.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                    :class="activePlayer.id == player.id ? 'active': ''"
                >
                    <b>{{ player.name }}</b>
                    <span class="badge badge-warning">{{ player.score }}</span>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayersHeader',

    computed: {
        players() {
            return this.$store.state.players;
        },

        activePlayer() {
            return this.$store.getters.activePlayer;
        },

        numberOfPlayers() {
            return this.$store.getters.numberOfPlayers;
        },

        splitPlayers() {
            let result;

            if (this.numberOfPlayers > 2) {
                result = [[], []];
            } else {
                return this.players;
            }

            for (let i = 0, j = 0; i < this.numberOfPlayers; i++) {
                if (i < Math.round(this.numberOfPlayers / 2)) {
                    result[0][i] = this.players[i];
                } else {
                    result[1][j] = this.players[i];
                    j++;
                }
            }

            return result;
        },

        numberOfColumns() {
            return this.numberOfPlayers > 2 ? 2 : 1;
        },
    },

    methods: {
        columnClass(index) {
            let classes = this.numberOfColumns == 2 ? 'col-6' : 'col-12';
            return index == 0 ? classes.concat(' pr-1') : classes.concat(' pl-1');
        },
    },
}
</script>