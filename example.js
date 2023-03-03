import Zorp from "./main.js";

const zorp = new Zorp({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});

const response = await zorp.chat("Hello, world!");

console.log(response);
