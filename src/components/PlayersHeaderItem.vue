<template>
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="isActive ? 'active' : ''"
    >
        <b>{{ playerName }}</b>
        <span
            class="badge badge-primary"
            :class="isActive ? 'bg-white text-dark' : ''"
            style="font-size: 100%;"
        >
            {{ playerScore }}
        </span>
    </li>
</template>

<script>
export default {
    name: 'PlayersHeaderItem',

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