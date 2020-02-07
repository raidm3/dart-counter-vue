<template>
    <div>
        <p class="text-monospace">
            <span
                v-for="(score, index) in scores"
                :key="index"
            >
                {{ score }}
                <span v-if="index < scores.length-1"> + </span>
                <span v-else> = </span>
            </span>
            <span
                class="badge badge-primary"
                style="font-size: 1rem;"
            >
                {{ scoreSum }}
            </span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'ScoreLine',

    props: {
        scores: {
            type: Array,
        },

        scoreSum: {
            type: Number,
            default: 0,
        },
    },

    computed: {
    }
}
</script>