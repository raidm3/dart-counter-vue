<template>
    <div class="snackbar" :class="{'show': showSnackbar}">
        <span class="font-weight-bold">{{ message }}</span>
    </div>
</template>

<script>
export default {
  name: 'Snackbar',

  data() {
    return {
      showSnackbar: false,
      message: '',
    };
  },

  methods: {
    async show(message, milliseconds = 3000) {
      this.message = message;
      this.showSnackbar = true;

      await setTimeout(() => {
        this.showSnackbar = false;
      }, milliseconds);
    },
  },
}
</script>

<style lang="css" scoped>
.snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 14px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
}

.snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>