<template>
  <div>
    <h1>Real Time Messaging</h1>
    <div>
      <div v-for="(msg, index) in messages" :key="index">
        <p>{{ msg }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMsg(userMsg)">
      <input v-model="userMsg" class="w-full py-2 px-4 border-gray-200 border focus:outline-none" type="text" name="content" id="content" placeholder="type somthing" />
      <input class="bg-gray-700 text-white cursor-pointer py-1 px-8" type="submit" value="Send Message" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

type messageType = string|number;

const connection = ref<any>('');
const userMsg = ref<messageType>('');
const messages = reactive<messageType[]>(['Welcome everyone, please send message.']);

const sendMsg = (message:any)=> {
  if (userMsg.value.trim() == "" || userMsg.value=='profanity') {
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
