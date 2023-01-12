<template>
  <h1 class="text-center text-2xl py-3 font-bold">Nuxt3 Websocket Chat</h1>
  <div class="w-2/3 mx-auto py-4 border-gray-200 border-2 p-4 shadow-md">
    <div class="bg-gray-100 p-4">
      <div class="bg-gray-400 text-white mb-1 p-2" v-for="(msg, index) in messages" :key="index">
        <p>{{ msg }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMsg(userMsg)">
      <div class="flex mt-4">
        <input v-model="userMsg" class="w-full py-2 px-4 border-gray-200 border focus:outline-none" type="text" name="content" id="content" placeholder="type somthing ...." />
        <input class="bg-gray-700 text-white cursor-pointer py-1 px-8" type="submit" value="Send Message" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

type messageType = string|number;

const connection = ref<any>('');
const userMsg = ref<messageType>('');
const messages = reactive<messageType[]>(['Welcome to everybody, please send nice messages.']);

const sendMsg = (message:any)=> {
  if (userMsg.value == "" || userMsg.value=='profanity') {
    userMsg.value = '';
    return;
  }
  connection.value.send(message.toLowerCase());
  userMsg.value = '';
}
onMounted(()=>{
  if (process.client) {
    console.log("Starting connection to WebSocket Server")
    connection.value = new WebSocket("ws://127.0.0.1:5555")
    connection.value.onmessage = function(event:any) {
      messages.push(event.data);
      console.log(event.data);
    }
    connection.value.onopen = function(event:any) {
      console.log("Successfully connected to the echo websocket server...")
    }
  }
});
</script>
