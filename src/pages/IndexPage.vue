<template lang="">
  <div class="min-h-[100vh] bg-[#fbf3f3] flex flex-col">
    <div class="mt-4 flex justify-end pr-6">
      <div class="min-w-[300px] overflow-y-auto h-28 lg:h-full py-4">
        <div class="font-semibold text-center">Leader Board</div>
        <div class="mt-1" v-for="(currentIndex, index) in item" :key="index">
          <LeaderComponent />
        </div>
      </div>
    </div>
    <div class="flex flex-1 justify-center items-center">
      <div class="mx-auto bg-white q-pa-md rounded min-w-[300px]">
        <div class="flex items-center justify-center text-lg font-semibold">
          TOEIC GAME
        </div>
        <div class="flex items-center justify-center text-base text-[#f27627]">
          Good to see you again
        </div>
        <div class="q-gutter-md mt-4">
          <q-input standout filled v-model="text" label="Username" />
          <q-input
            standout
            filled
            v-model="text"
            label="Password (8+ characters)"
          />
        </div>
        <div class="mt-2 text-xs text-[#f27627]">Forget password ?</div>
        <div class="w-full flex justify-center mt-4">
          <q-btn outline flat label="LOG IN" class="bg-green-300 w-2/3"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LeaderComponent from 'src/components/LeaderComponent.vue';
import { ref } from 'vue';
const item = ref(5);
</script>
<style lang=""></style>
