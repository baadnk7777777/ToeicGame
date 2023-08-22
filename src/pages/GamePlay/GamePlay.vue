<template lang="">
  <div class="min-h-[100vh] bg-[#fbf3f3] flex flex-col">
    <div class="flex flex-1 justify-center items-center">
      <div class="">
        <div class="flex justify-center mb-4 font-bold text-base">
          Score: {{ score }}
        </div>
        <div class="flex justify-center mb-4">{{ answerData.Thai_Word }}</div>
        <div class="flex gap-4">
          <q-btn
            outline
            class="min-w-[100px]"
            :label="randomDataFirst.Eng_Word"
            @click="submitAnswer(randomDataFirst.No)"
          ></q-btn>
          <q-btn
            outline
            class="min-w-[100px]"
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
  randomWord();
  setTimeout(() => {
    console.log(anim.value.goToAndPlay(150, true));
    anim.value;
  }, 500);
});

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
</script>
<style lang=""></style>
