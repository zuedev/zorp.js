import Zorp from "./main.js";

const zorp = new Zorp({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});

console.log(await zorp.chat("Hello, world!"));
console.log(await zorp.answer("What is the square root of 36?"));
console.log(await zorp.explain("The trade federation's blockade of Naboo."));
