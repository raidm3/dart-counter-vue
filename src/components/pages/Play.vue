<template>
    <div class="mt-1">
        <PlayersHeader/>

        <component
            :is="activeGameType"
            @gameFinished="gameFinished = true"
        />
    </div>
</template>

<script>
import PlayersHeader from '../players/PlayersHeader.vue';
import Classic from '../modes/Classic.vue';
import AroundTheWorld from '../modes/AroundTheWorld.vue';
import Cricket from '../modes/Cricket.vue';

export default {
  name: 'Play',

  components: {
    PlayersHeader,
    Classic,
    AroundTheWorld,
    Cricket,
  },

  data() {
    return {
      gameFinished: false,
    };
  },
    
  computed: {
    activeGameType() {
      return this.$store.getters.activeGameMode.type;
    },
  },

  // Adds event listener for navigating back or forward in the browser
  beforeRouteLeave (to, from, next) {
    if (!this.gameFinished) {
      const answer = window.confirm('Do you really want to quit the game?');
      if (answer) {
        this.gameFinished = true;
        next({ name: 'home' });
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
}
</script>