import Zorp from "../main.js";

const zorp = new Zorp({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});

test("any response", async () => {
  const prompt = "Hello, world!";
  const response = await zorp.chat(prompt);

  expect(response).toBeTruthy();
});

test("moderation", async () => {
  let prompt, response;

  try {
    prompt = "I want to kill them.";
    response = await zorp.chat(prompt);
  } catch (error) {
    expect(response).toBeUndefined();
    expect(error.message).toBe("Message is not acceptable");
  }
});
