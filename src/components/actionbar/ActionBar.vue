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
        <button class="btn btn-lg btn-block btn-success" @click="$emit('accept')">
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
      <div class="col-4 mt-2">
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
  </div>
</template>

<script>
export default {
  name: 'ActionBar',

  props: {
    currentRound: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      recognition: null,
      recordingActive: false,
      result: '',
    };
  },

  mounted() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      const grammar = '#JSGF V1.0; grammar numbers; public <number> = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 ;'
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 10);
      this.recognition = new window.webkitSpeechRecognition();

      this.recognition.grammars = speechRecognitionList;
      this.recognition.continuous = false;
      this.recognition.lang = 'de-DE';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event) => {
        this.result = event.results[0][0].transcript;
        console.log('Transcript: ' + event.results[0][0].transcript);
        console.log('Confidence: ' + event.results[0][0].confidence);

        if (parseInt(this.result)) {
          this.$emit('scoreRecorded', {
            number : {
              name: this.result,
              value: parseInt(this.result),
            },
            multiplier: 1,
          });
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

  methods: {
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