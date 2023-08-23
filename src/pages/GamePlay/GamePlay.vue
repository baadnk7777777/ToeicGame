<template lang="">
  <div class="min-h-[100vh] bg-[#fbf3f3] flex flex-col">
    <div class="flex flex-1 justify-center items-center">
      <div v-if="counter.src > 5" class="drop-shadow-md rounded-md">
        <div
          class="bg-red-400 text-white font-bold text-base md:text-2xl pl-4 rounded-t-md"
        >
          Timeout
        </div>
        <div class="bg-white px-6 py-6 rounded-b-md">
          <div class="md:text-3xl text-center mb-2">1 min 0 secs</div>
          <div class="md:text-xl">
            Please click "Play Again" for new game. or
            <div class="">"Back to Home" for back to home page.</div>
          </div>
          <div class="flex gap-4 justify-center">
            <q-btn
              label="Play Again"
              outline
              class="min-w-[100px] lg:w-60 text-center lg:text-2xl mt-4"
              @click="playAgin()"
            ></q-btn>
            <q-btn
              label="Back to Home"
              outline
              class="min-w-[100px] lg:w-60 text-center lg:text-2xl mt-4"
              @click="playAgin()"
            ></q-btn>
          </div>
        </div>
      </div>

      <div v-if="counter.src < 5" class="">
        <div class="flex justify-center mb-4 font-bold text-base lg:text-4xl">
          Score: {{ score }} | Timer: {{ counter.src }}
        </div>
        <div class="flex justify-center mb-4 lg:text-2xl">
          {{ answerData.Thai_Word }}
        </div>
        <div class="flex gap-4">
          <q-btn
            outline
            class="min-w-[100px] lg:w-60 text-center lg:text-2xl"
            :label="randomDataFirst.Eng_Word"
            @click="submitAnswer(randomDataFirst.No)"
          ></q-btn>
          <q-btn
            outline
            class="min-w-[100px] lg:w-60 text-center lg:text-2xl"
            :label="randomDataSecond.Eng_Word"
            @click="submitAnswer(randomDataSecond.No)"
          ></q-btn>
          <LottieAnimation
            v-if="fireworkActive"
            class="absolute bottom-0 top-0 left-0 right-0"
            :animation-data="WatermelonJSON"
            :auto-play="true"
            :loop="true"
            :speed="1"
            ref="anim"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import lawJson from '../GamePlay/csvjson.json';
import { onMounted, ref } from 'vue';
import { LottieAnimation } from 'lottie-web-vue';
import WatermelonJSON from '../GamePlay/firework.json';

export interface WordInfo {
  No: number;
  Word_Type: string;
  Eng_Word: string;
  Thai_Word: string;
  Ex_Sentence: string;
}
const wordResponse = ref<WordInfo[]>([]);
const randomDataFirst = ref<WordInfo>({
  No: 0,
  Word_Type: '',
  Eng_Word: '',
  Thai_Word: '',
  Ex_Sentence: '',
});
const randomDataSecond = ref<WordInfo>({
  No: 0,
  Word_Type: '',
  Eng_Word: '',
  Thai_Word: '',
  Ex_Sentence: '',
});

let anim = ref();

const text = ref<WordInfo | undefined>();
const answerData = ref<WordInfo>({
  No: 0,
  Word_Type: '',
  Eng_Word: '',
  Thai_Word: '',
  Ex_Sentence: '',
});
const score = ref(0);
const fireworkActive = ref(false);
onMounted(() => {
  wordResponse.value = lawJson;
  startTimer();
  randomWord();
  setTimeout(() => {
    console.log(anim.value.goToAndPlay(150, true));
    anim.value;
  }, 500);
});

const playAgin = () => {
  score.value = 0;
  counter.value.src = 0;
  randomWord();
};

const submitAnswer = (wordNo: number) => {
  console.log('submitAnswer');
  if (wordNo === answerData.value.No) {
    console.log('correct');
    score.value += 1;
  } else {
    console.log('wrong');
  }
  randomWord();
};

const randomWord = async () => {
  const maxRange = wordResponse.value.length;
  const random = Math.floor(Math.random() * maxRange);
  const randomSecond = Math.floor(Math.random() * maxRange);
  randomDataFirst.value = wordResponse.value[random];
  randomDataSecond.value = wordResponse.value[randomSecond];
  text.value = wordResponse.value[randomSecond];
  const randomAnswer = Math.floor(Math.random() * 2); // 0 -> 1
  answerData.value =
    randomAnswer === 0 ? randomDataFirst.value : randomDataSecond.value;
};

const counter = ref({
  min: 0,
  src: 0,
});

const startTimer = () => {
  setInterval(() => {
    counter.value.src += 1;
  }, 1000);
};
</script>
<style lang=""></style>
