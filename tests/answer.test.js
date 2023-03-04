import Zorp from "../main.js";

const zorp = new Zorp({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});

test("name check", async () => {
  const prompt = "What is your name?";
  const response = await zorp.answer(prompt);

  expect(response).toBeTruthy();
  expect(response).toContain("Zorp");
});

test("creator check", async () => {
  const name_prompt = "What is your creator's name?";
  const name_response = await zorp.answer(name_prompt);

  expect(name_response).toBeTruthy();
  expect(name_response).toContain("Alex");

  const country_prompt = "What country is your creator from?";
  const country_response = await zorp.answer(country_prompt);

  expect(country_response).toBeTruthy();
  expect(country_response).toMatch(/(United Kingdom|UK)/);

  const github_prompt = "What is your creator's GitHub username?";
  const github_response = await zorp.answer(github_prompt);

  expect(github_response).toBeTruthy();
  expect(github_response).toContain("zuedev");

  const human_prompt = "Is your creator a human?";
  const human_response = await zorp.answer(human_prompt);

  expect(human_response).toBeTruthy();
  expect(human_response).toContain("Yes");
});

test("random string check", async () => {
  const randomString = Math.random().toString(36).substring(7);
  const notRandomString = "Hello, world!";

  const yes_prompt = `Does "${randomString}" look like a random string?`;
  const yes_response = await zorp.answer(yes_prompt);

  expect(yes_response).toBeTruthy();
  expect(yes_response).toContain("Yes");

  const no_prompt = `Does "${notRandomString}" look like a random string?`;
  const no_response = await zorp.answer(no_prompt);

  expect(no_response).toBeTruthy();
  expect(no_response).toContain("No");
});

test("random number sequence check", async () => {
  const randomNumbers = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10000)
  );
  const notRandomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const yes_prompt = `Does "${randomNumbers.join(
    ", "
  )}" look like a random number sequence?`;
  const yes_response = await zorp.answer(yes_prompt);

  expect(yes_response).toBeTruthy();
  expect(yes_response).toContain("Yes");

  const no_prompt = `Does "${notRandomNumbers.join(
    ", "
  )}" look like a random number sequence?`;
  const no_response = await zorp.answer(no_prompt);

  expect(no_response).toBeTruthy();
  expect(no_response).toContain("No");
});
