<template>
  <div>
    <h1>Real Time Messaging</h1>
    <textarea v-model="userMsg" name="" id="" cols="100" rows="10"></textarea>
    <button @click="sendMsg(userMsg)" id="send" title="Send Message!">Send Message</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

type messageType = string|number;

const connection = ref<any>('');
const userMsg = ref<messageType>('');


const sendMsg = (message:messageType)=> {
  connection.value.send(message);
  userMsg.value = '';
}

onMounted(()=>{
  if (process.client) {
    console.log("Starting connection to WebSocket Server")
    connection.value = new WebSocket("ws://127.0.0.1:5555")

    connection.value.onmessage = function(event:any) {
      console.log(event.data);
    }

    connection.value.onopen = function(event:any) {
      console.log("Successfully connected to the echo websocket server...")
    }
  }

});
</script>
