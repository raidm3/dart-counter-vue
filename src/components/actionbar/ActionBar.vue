<template>
  <div>
    <div class="row m-1">
      <div class="col-6 px-2">
        <button class="btn btn-lg btn-block btn-danger" @click="$emit('undo')">
          <b>Undo</b>
          <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'undo']" />
        </button>
      </div>
      <div class="col-6 px-2">
        <button
          v-if="!wasMatchThrow"
          class="btn btn-lg btn-block btn-success"
          @click="handleAccept($event)"
        >
          <b>Accept</b>
          <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'check']" />
        </button>
        <button
          v-else
          class="btn btn-lg btn-block btn-success"
          data-toggle="modal"
          data-target="#matchDartsModal"
        >
          <b>Accept</b>
          <font-awesome-icon class="ml-1 pl-1" :icon="['fas', 'check']" />
        </button>
      </div>
    </div>
    <div class="row mx-1 my-2">
      <div class="col-4">
        <button class="btn btn-block btn-link" @click="quitGame">
          <font-awesome-icon class="mr-2" :icon="['fas', 'arrow-left']" />
          <b>Quit Game</b>
        </button>
      </div>
      <div
        v-if="gameMode.type === 'Classic'" 
        class="col-4 mt-2"
      >
        <button
          v-if="!recordingActive"
          class="btn btn-secondary btn-block btn-lg"
          type="button"
          @click="startRecording"
        >
          <font-awesome-icon :icon="['fas', 'microphone']" />
        </button>
        <button
          v-else
          class="btn btn-secondary btn-block btn-lg"
          type="button"
          @click="stopRecording"
        >
          <font-awesome-icon :icon="['fas', 'stop-circle']" />
        </button>
      </div>
      <div class="col-4">
        <span class="text-monospace btn d-block">Round: {{ currentRound }}</span>
      </div>
    </div>

    <Snackbar ref="snackbar"/>

    <div
      class="modal fade"
      id="matchDartsModal"
      tabindex="-1"
      role="dialog"
      data-backdrop="static"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">How many match darts?</h5>
            <button ref="hideModal" type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex">
              <button
                type="button"
                class="btn btn-block btn-outline-dark mx-1 my-0 p-3 font-weight-bold"
                :disabled="remainingScore === 0"
                @click="accept"
              >
                0
              </button>
              <button
                type="button"
                class="btn btn-block btn-outline-dark mx-1 my-0 p-3 font-weight-bold"
                @click="accept"
              >
                1
              </button>
              <button
                type="button"
                class="btn btn-block btn-outline-dark mx-1 my-0 p-3 font-weight-bold"
                @click="accept"
              >
                2
              </button>
              <button
                type="button"
                class="btn btn-block btn-outline-dark mx-1 my-0 p-3 font-weight-bold"
                @click="accept"
              >
                3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Snackbar from "../notifications/SnackBar.vue";

export default {
  name: 'ActionBar',

  components: {
    Snackbar,
  },

  props: {
    currentRound: {
      type: Number,
      default: 1,
    },

    scoreSum: {
      type: Number,
      default: 0,
    },

    activePlayerScore: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      recognition: null,
      recordingActive: false,
      checkoutNumbers: [170, 167, 164, 161, 160, 158, 157, 156, 155, 154, 153, 152, 151, 150, 149, 148, 147, 146, 145, 144, 143, 142, 141, 140, 139, 138, 137, 136, 135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 101, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    };
  },

  mounted() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      const grammar = '#JSGF V1.0; grammar numbers; public <number> = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;'
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 10);
      this.recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

      this.recognition.grammars = speechRecognitionList;
      this.recognition.continuous = false;
      this.recognition.lang = 'de-DE';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 5;

      this.recognition.onresult = (event) => {
        let result;

        // check all alternatives if at one number is found
        for (let i = 0; i < event.results[0].length; i++) {
          if (!isNaN(event.results[0][i].transcript)) {
            result = event.results[0][i].transcript;
            break;
          }
        }

        if (result) {
          this.$emit('scoreRecorded', {
            number : {
              name: result,
              value: parseInt(result),
            },
            multiplier: 1,
          });
        } else {
          this.$refs.snackbar.show(event.results[0][0].transcript);
        }
      }

      this.recognition.onaudioend = () => {
        this.recordingActive = false;
      }

      this.recognition.onnomatch = (event) => {
        console.log('Speech not matched: ' + event);
      }

      this.recognition.onerror = (event) => {
        console.log('Error occurred in recognition: ' + event.error);
      }
    }
  },

  computed: {
    gameMode() {
      return this.$store.getters.activeGameMode;
    },

    remainingScore() {
      return this.activePlayerScore - this.scoreSum;
    },

    isScoreCheckoutable() {
      return this.checkoutNumbers.includes(this.playerScore);
    },

    playerScore() {
      return this.activePlayerScore.valueOf();
    },

    wasMatchThrow() {
      return this.remainingScore <= 40 && this.isScoreCheckoutable;
    },
  },

  methods: {
    accept(event) {
      this.$refs.hideModal.click();
      this.$emit('accept', +event.target.innerText);
    },

    handleAccept(event) {
      // prevent event bubbling of click to open modal
      event.stopPropagation();
      this.$emit('accept');
    },

    quitGame() {
      this.$router.push({ path: '/' });
    },

    startRecording() {
      this.recognition.start();
      this.recordingActive = true;
    },

    stopRecording() {
      this.recognition.stop();
      this.recordingActive = false;
    }
  },
}
</script>