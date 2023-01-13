<template>
  <h1 class="text-center text-2xl py-3 font-bold">Nuxt3 Websocket Chat</h1>
  <div class="w-11/12 md:w-2/3 mx-auto py-4 border-gray-200 border-2 p-4 shadow-md">
    <div class="bg-gray-100 p-4">
      <div v-for="(msg, index) in messages" :key="index" class="bg-gray-400 text-white mb-1 p-2">
        <p>{{ msg }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMsg(value)">
      <div class="flex mt-4">
        <input :class="errorMessage ? 'border-red-500 border' : ''" v-model="value" class="w-full py-2 px-4 border-gray-200 border focus:outline-none" type="text" placeholder="type somthing ...." />
        <input class="bg-gray-700 text-white cursor-pointer py-1 px-8" type="submit" value="Send Message" />
      </div>
      <span class="text-red-500 text-sm">{{ errorMessage }}</span>
    </form>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, reactive, ref } from "vue";
import { useField } from "vee-validate";

useHead({
  title: "Nuxt3 Websocket Chat",
});

type messageType = string | number;

function validateField(value: any) {
  if (!value) {
    return "this field is required";
  }
  if (value.includes("profanity")) {
    return "It's not a politely word";
  }
  return true;
}

const { value, errorMessage } = useField("fullName", validateField);

const connection = ref<any>("");
const messages = reactive<messageType[]>(["Welcome to everybody, please send nice messages."]);

const sendMsg = (message: any) => {
  if (value.value == "" || value.value.includes("profanity")) {
    value.value = "";
    return;
  }
  connection.value.send(message.toLowerCase());
  value.value = "";
};
onMounted(() => {
  if (process.client) {
    console.log("Starting connection to WebSocket Server");
    connection.value = new WebSocket("ws://127.0.0.1:5321");
    connection.value.onmessage = function (event: any) {
      messages.push(event.data);
      //console.log(event.data);
    };
    connection.value.onopen = function (event: any) {
      console.log("Successfully connected to the echo websocket server...");
    };
    connection.value.onclose = function (event: any) {
      messages.push("[close] Connection died, please run server.js");
    };
  }
});
</script>
