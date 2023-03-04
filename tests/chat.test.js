import Zorp from "../main.js";

const zorp = new Zorp({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});

test("any response", async () => {
  const prompt = "Hello, world!";
  const response = await zorp.chat(prompt);

  console.log({
    prompt,
    response,
  });

  expect(response).toBeTruthy();
});
