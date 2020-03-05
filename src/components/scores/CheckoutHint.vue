<template>
    <div class="border-top mt-2 mx-5">
        <span
            v-if="checkoutHint"
            class="d-block font-italic text-muted mt-1"
            style="font-size: 80%;"
        >
            [{{ checkoutHint }}]
        </span>
        <span
            v-else
            class="d-block font-italic text-muted mt-1"
            style="font-size: 80%;"
        >
            ---
        </span>
    </div>
</template>

<script>
export default {
    name: 'CheckoutHint',

    data() {
        return {
            threeShotFinisher: [
                { score: 170, shots: [60, 60, 50], hint: 'T20 T20 DB' },
                { score: 167, shots: [60, 57, 50], hint: 'T20 T19 DB' },
                { score: 164, shots: [60, 54, 50], hint: 'T20 T18 DB' },
                { score: 161, shots: [60, 51, 50], hint: 'T20 T17 DB' },
                { score: 160, shots: [60, 60, 40], hint: 'T20 T20 D20' },
                { score: 158, shots: [60, 60, 38], hint: 'T20 T20 D19' },
                { score: 157, shots: [60, 57, 40], hint: 'T20 T19 D20' },
                { score: 156, shots: [60, 60, 36], hint: 'T20 T20 D18' },
                { score: 155, shots: [60, 57, 38], hint: 'T20 T19 D19' },
                { score: 154, shots: [60, 54, 40], hint: 'T20 T18 D20' },
                { score: 153, shots: [60, 57, 36], hint: 'T20 T19 D18' },
                { score: 152, shots: [60, 60, 32], hint: 'T20 T20 D16' },
                { score: 151, shots: [60, 51, 40], hint: 'T20 T17 D20' },
                { score: 150, shots: [60, 54, 36], hint: 'T20 T18 D18' },
                { score: 149, shots: [60, 57, 32], hint: 'T20 T19 D16' },
                { score: 148, shots: [60, 60, 28], hint: 'T20 T20 D14' },
                { score: 147, shots: [60, 51, 36], hint: 'T20 T17 D18' },
                { score: 146, shots: [60, 54, 32], hint: 'T20 T18 D16' },
                { score: 145, shots: [60, 57, 28], hint: 'T20 T19 D14' },
                { score: 144, shots: [60, 60, 24], hint: 'T20 T20 D12' },
                { score: 143, shots: [60, 51, 32], hint: 'T20 T17 D16' },
                { score: 142, shots: [60, 42, 40], hint: 'T20 T14 D20' },
                { score: 141, shots: [60, 57, 24], hint: 'T20 T19 D12' },
                { score: 140, shots: [60, 60, 20], hint: 'T20 T20 D10' },
                { score: 139, shots: [60, 39, 40], hint: 'T20 T13 D20' },
                { score: 138, shots: [60, 54, 24], hint: 'T20 T18 D12' },
                { score: 137, shots: [60, 57, 20], hint: 'T20 T19 D10' },
                { score: 136, shots: [60, 60, 16], hint: 'T20 T20 D8' },
                { score: 135, shots: [60, 51, 24], hint: 'T20 T17 D12' },
                { score: 134, shots: [60, 48, 26], hint: 'T20 T16 D13' },
                { score: 133, shots: [60, 57, 16], hint: 'T20 T19 D8' },
                { score: 132, shots: [60, 48, 24], hint: 'T20 T16 D12' },
                { score: 131, shots: [57, 42, 32], hint: 'T19 T14 D16' },
                { score: 130, shots: [60, 60, 10], hint: 'T20 T20 D5' },
                { score: 129, shots: [57, 48, 24], hint: 'T19 T16 D12' },
                { score: 128, shots: [54, 42, 32], hint: 'T18 T14 D16' },
                { score: 127, shots: [60, 51, 16], hint: 'T20 T17 D8' },
                { score: 126, shots: [57, 57, 12], hint: 'T19 T19 D6' },
                { score: 125, shots: [54, 57, 14], hint: 'T18 T19 D7' },
                { score: 124, shots: [60, 42, 22], hint: 'T20 T14 D11' },
                { score: 123, shots: [57, 48, 18], hint: 'T19 T16 D9' },
                { score: 122, shots: [54, 54, 14], hint: 'T18 T18 D7' },
                { score: 121, shots: [60, 33, 28], hint: 'T20 T11 D14' },
                { score: 120, shots: [60, 20, 40], hint: 'T20 20 D20' },
                { score: 119, shots: [57, 36, 26], hint: 'T19 T12 D13' },
                { score: 118, shots: [60, 18, 40], hint: 'T20 18 D20' },
                { score: 117, shots: [57, 20, 40], hint: 'T19 20 D20' },
                { score: 116, shots: [57, 19, 40], hint: 'T19 19 D20' },
                { score: 115, shots: [60, 15, 40], hint: 'T20 15 D20' },
                { score: 114, shots: [57, 17, 40], hint: 'T19 17 D20' },
                { score: 113, shots: [57, 16, 40], hint: 'T19 16 D20' },
                { score: 112, shots: [60, 36, 16], hint: 'T20 T12 D8' },
                { score: 111, shots: [57, 14, 40], hint: 'T19 14 D20' },
                { score: 110, shots: [60, 30, 20], hint: 'T20 T10 D10' },
                { score: 109, shots: [60, 9, 40], hint: 'T20 9 D20' },
                { score: 108, shots: [60, 8, 40], hint: 'T20 8 D20' },
                { score: 107, shots: [57, 30, 20], hint: 'T19 T10 D10' },
                { score: 106, shots: [60, 30, 16], hint: 'T20 T10 D8' },
                { score: 105, shots: [60, 13, 32], hint: 'T20 13 D16' },
                { score: 104, shots: [57, 15, 32], hint: 'T19 15 D16' },
                { score: 103, shots: [57, 6, 40], hint: 'T19 6 D20' },
                { score: 102, shots: [60, 10, 32], hint: 'T20 10 D16' },
                { score: 101, shots: [60, 9, 32], hint: 'T20 9 D16' },
                { score: 99, shots: [57, 10, 32], hint: 'T19 10 D16' },
            ],

            twoShotFinisher: [
                { score: 110, shots: [60, 50], hint: 'T20 DB' },
                { score: 107, shots: [57, 50], hint: 'T19 DB' },
                { score: 104, shots: [54, 50], hint: 'T18 DB' },
                { score: 101, shots: [51, 50], hint: 'T17 DB' },
                { score: 100, shots: [60, 40], hint: 'T20 D20' },
                { score: 98, shots: [60, 38], hint: 'T20 D19' },
                { score: 97, shots: [57, 40], hint: 'T19 D20' },
                { score: 96, shots: [60, 36], hint: 'T20 D18' },
                { score: 95, shots: [57, 38], hint: 'T19 D19' },
                { score: 94, shots: [54, 40], hint: 'T18 D20' },
                { score: 93, shots: [57, 36], hint: 'T19 D18' },
                { score: 92, shots: [60, 32], hint: 'T20 D16' },
                { score: 91, shots: [51, 40], hint: 'T17 D20' },
                { score: 90, shots: [54, 36], hint: 'T18 D18' },
                { score: 89, shots: [57, 32], hint: 'T19 D16' },
                { score: 88, shots: [60, 28], hint: 'T20 D14' },
                { score: 87, shots: [51, 36], hint: 'T17 D18' },
                { score: 86, shots: [54, 32], hint: 'T18 D16' },
                { score: 85, shots: [45, 40], hint: 'T15 D20' },
                { score: 84, shots: [60, 24], hint: 'T20 D12' },
                { score: 83, shots: [51, 32], hint: 'T17 D16' },
                { score: 82, shots: [50, 32], hint: 'DB D16' },
                { score: 81, shots: [57, 24], hint: 'T19 D12' },
                { score: 80, shots: [60, 20], hint: 'T20 D10' },
                { score: 79, shots: [57, 22], hint: 'T19 D11' },
                { score: 78, shots: [54, 24], hint: 'T18 D12' },
                { score: 77, shots: [57, 20], hint: 'T19 D10' },
                { score: 76, shots: [60, 16], hint: 'T20 D8' },
                { score: 75, shots: [51, 24], hint: 'T17 D12' },
                { score: 74, shots: [42, 32], hint: 'T14 D16' },
                { score: 73, shots: [57, 16], hint: 'T19 D8' },
                { score: 72, shots: [48, 24], hint: 'T16 D12' },
                { score: 71, shots: [39, 32], hint: 'T13 D16' },
                { score: 70, shots: [60, 10], hint: 'T20 D5' },
                { score: 69, shots: [57, 12], hint: 'T19 D6' },
                { score: 68, shots: [54, 14], hint: 'T18 D7' },
                { score: 67, shots: [51, 16], hint: 'T17 D8' },
                { score: 66, shots: [48, 18], hint: 'T16 D9' },
                { score: 65, shots: [45, 20], hint: 'T15 D10' },
                { score: 64, shots: [42, 22], hint: 'T14 D11' },
                { score: 63, shots: [39, 24], hint: 'T13 D12' },
                { score: 62, shots: [36, 26], hint: 'T12 D13' },
                { score: 61, shots: [33, 28], hint: 'T11 D14' },
                { score: 60, shots: [20, 40], hint: '20 D20' },
                { score: 59, shots: [19, 40], hint: '19 D20' },
                { score: 58, shots: [18, 40], hint: '18 D20' },
                { score: 57, shots: [17, 40], hint: '17 D20' },
                { score: 56, shots: [48, 8], hint: 'T16 D4' },
                { score: 55, shots: [15, 40], hint: '15 D20' },
                { score: 54, shots: [14, 40], hint: '14 D20' },
                { score: 53, shots: [13, 40], hint: '13 D20' },
                { score: 52, shots: [12, 40], hint: '12 D20' },
                { score: 51, shots: [11, 40], hint: '11 D20' },
                { score: 50, shots: [10, 40], hint: '10 D20' },
                { score: 49, shots: [9, 40], hint: '9 D20' },
                { score: 48, shots: [8, 40], hint: '8 D20' },
                { score: 47, shots: [7, 40], hint: '7 D20' },
                { score: 46, shots: [6, 40], hint: '6 D20' },
                { score: 45, shots: [13, 32], hint: '13 D16' },
                { score: 44, shots: [12, 32], hint: '12 D16' },
                { score: 43, shots: [3, 40], hint: '3 D20' },
                { score: 42, shots: [10, 32], hint: '10 D16' },
                { score: 41, shots: [10, 32], hint: '9 D16' },
            ],
        };
    },

    props: {
        scores: {
            type: Array,
            required: true,
        },

        scoreSum: {
            type: Number,
            default: 0,
        },

        activePlayerScore: {
            type: Number,
            required: true,
        },
    },

    computed: {
        numberOfShots() {
            return this.scores.length;
        },

        lastShot() {
            return this.numberOfShots > 0 ?
                this.scores[this.numberOfShots-1].number.value * this.scores[this.numberOfShots-1].multiplier :
                null;
        },

        checkoutHint() {
            let checkout;

            /* Don't show checkout hint if no shots are available. */
            if (this.remainingShots == 0) {
                return '';
            }

            /*  Check if last shot matches shot from checkout hint.
                If it does, return the current checkout hint. */
            if (this.numberOfShots > 0 && Object.keys(this.$store.state.checkoutHint).length > 0) {
                const currentCheckout = this.$store.state.checkoutHint;
                let currentShotHint;

                if (this.numberOfShots >= currentCheckout.shots.length)
                    currentShotHint = currentCheckout.shots[this.numberOfShots - currentCheckout.shots.length];
                else
                    currentShotHint = currentCheckout.shots[this.numberOfShots - 1];

                if (currentShotHint == this.lastShot)
                    return currentCheckout.hint;
            }

            /* Go through both checkout lists to find if a new checkout matches. */
            if (this.remainingShots >= 2) {
                checkout = this.twoShotFinisher.find((hint) => hint.score == this.remainingScore);
            }
            if (this.remainingShots == 3 && !checkout) {
                checkout = this.threeShotFinisher.find((hint) => hint.score == this.remainingScore);
            }

            /* If a checkout hint has been found, save it in the store and return it. */
            if (checkout) {
                this.$store.dispatch('setCheckoutHint', checkout);
            }

            return checkout ? checkout.hint : '';
        },

        remainingScore() {
            return this.activePlayerScore - this.scoreSum;
        },

        remainingShots() {
            return 3 - this.scores.length;
        },
    },
}
</script>