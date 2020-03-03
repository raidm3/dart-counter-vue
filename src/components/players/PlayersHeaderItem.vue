<template>
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="isActive ? 'active' : ''"
        style="font-size: 1.25rem;"
    >
        <b>{{ playerName }}</b>
        <span
            class="badge badge-primary"
            :class="isActive ? 'bg-white text-dark' : ''"
            style="font-size: 1.25rem;"
        >
            <AnimatedNumber :number="playerScore"/>
        </span>
    </li>
</template>

<script>
import AnimatedNumber from '../scores/AnimatedNumber.vue';

export default {
    name: 'PlayersHeaderItem',

    components: {
        AnimatedNumber,
    },

    props: {
        playerName: {
            type: String,
            required: true,
        },
        playerScore: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
    },
};
</script>