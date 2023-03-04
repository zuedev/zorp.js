import Zorp from "../main.js";

const zorp = new Zorp({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});

test("the trade federation's blockade of Naboo", async () => {
  const prompt = "The trade federation's blockade of Naboo.";
  const response = await zorp.explain(prompt);

  expect(response).toBeTruthy();
  expect(response.length).toBeGreaterThan(250);
});
