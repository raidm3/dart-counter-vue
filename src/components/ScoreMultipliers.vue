<template>
    <div class="row mx-2 mt-2">
        <div class="col-6 px-1">
            <div class="custom-control custom-switch border py-2">
                <input
                    type="checkbox"
                    class="custom-control-input"
                    id="doubleSwitch"
                    :checked="scoreMultiplier == 2"
                    @click="setScoreMultiplier($event)">
                <label class="custom-control-label font-weight-bold" for="doubleSwitch">Double</label>
            </div>
        </div>
        <div class="col-6 px-1">
            <div class="custom-control custom-switch border py-2">
                <input
                    type="checkbox"
                    class="custom-control-input"
                    id="tripleSwitch"
                    :checked="scoreMultiplier == 3"
                    @click="setScoreMultiplier($event)">
                <label class="custom-control-label font-weight-bold" for="tripleSwitch">Triple</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScoreMultipliers',

    props: {
        scoreMultiplier: {
            type: Number,
            required: true,
        },
    },

    methods: {
        setScoreMultiplier(event) {
            // double switch has been clicked
            if (event.target.id == 'doubleSwitch') {
                document.querySelector('#tripleSwitch').checked = false;

                if (event.target.checked) {
                    this.$emit('scoreMultiplierChanged', 2);
                } else {
                    this.$emit('scoreMultiplierChanged', 1);
                }
            }

            // triple switch has been clicked
            if (event.target.id == 'tripleSwitch') {
                document.querySelector('#doubleSwitch').checked = false;

                if (event.target.checked) {
                    this.$emit('scoreMultiplierChanged', 3);
                } else {
                    this.$emit('scoreMultiplierChanged', 1);
                }
            }
        },
    },
}
</script>