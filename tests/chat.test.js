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

test("name check", async () => {
  const prompt = "What is your name?";
  const response = await zorp.chat(prompt);

  console.log({
    prompt,
    response,
  });

  expect(response).toBeTruthy();
  expect(response).toContain("Zorp");
});

test("creator check", async () => {
  const name_prompt = "What is your creator's name?";
  const name_response = await zorp.chat(name_prompt);

  console.log({
    name_prompt,
    name_response,
  });

  expect(name_response).toBeTruthy();
  expect(name_response).toContain("Alex");

  const country_prompt = "What country is your creator from?";
  const country_response = await zorp.chat(country_prompt);

  console.log({
    country_prompt,
    country_response,
  });

  expect(country_response).toBeTruthy();
  expect(country_response).toMatch(/(United Kingdom|UK)/);

  const github_prompt = "What is your creator's GitHub username?";
  const github_response = await zorp.chat(github_prompt);

  console.log({
    github_prompt,
    github_response,
  });

  expect(github_response).toBeTruthy();
  expect(github_response).toContain("zuedev");

  const human_prompt = "Is your creator a human?";
  const human_response = await zorp.chat(human_prompt);

  console.log({
    human_prompt,
    human_response,
  });

  expect(human_response).toBeTruthy();
  expect(human_response).toContain("Yes");
});

test("random string check", async () => {
  const randomString = Math.random().toString(36).substring(7);
  const notRandomString = "Hello, world!";

  const yes_prompt = `Does "${randomString}" look like a random string? Answer "Yes" or "No" without any explanation.`;
  const yes_response = await zorp.chat(yes_prompt);

  console.log({
    yes_prompt,
    yes_response,
  });

  expect(yes_response).toBeTruthy();
  expect(yes_response).toContain("Yes");

  const no_prompt = `Does "${notRandomString}" look like a random string? Answer "Yes" or "No".`;
  const no_response = await zorp.chat(no_prompt);

  console.log({
    no_prompt,
    no_response,
  });

  expect(no_response).toBeTruthy();
  expect(no_response).toContain("No");

  const self_prompt_setup = `Give me a random string of 7 characters without any punctuation or explanation.`;
  const aiGivenRandomString = await zorp.chat(self_prompt_setup);
  const self_prompt = `Does "${aiGivenRandomString}" look like a random string? Answer "Yes" or "No".`;
  const self_response = await zorp.chat(self_prompt);

  console.log({
    self_prompt_setup,
    aiGivenRandomString,
    self_prompt,
    self_response,
  });

  expect(self_response).toBeTruthy();
  expect(self_response).toContain("Yes");
});

test("random number sequence check", async () => {
  const randomNumbers = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10000)
  );
  const notRandomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const yes_prompt = `Does "${randomNumbers.join(
    ", "
  )}" look like a random number sequence? Answer "Yes" or "No" without any explanation.`;
  const yes_response = await zorp.chat(yes_prompt);

  console.log({
    yes_prompt,
    yes_response,
  });

  expect(yes_response).toBeTruthy();
  expect(yes_response).toContain("Yes");

  const no_prompt = `Does "${notRandomNumbers.join(
    ", "
  )}" look like a random number sequence? Answer "Yes" or "No".`;
  const no_response = await zorp.chat(no_prompt);

  console.log({
    no_prompt,
    no_response,
  });

  expect(no_response).toBeTruthy();
  expect(no_response).toContain("No");

  const self_prompt_setup = `Give me a random number sequence of 10 numbers ranging from 1-1000 separated by commas without any punctuation or explanation.`;
  const aiGivenRandomNumbers = await zorp.chat(self_prompt_setup);
  const self_prompt = `Does "${aiGivenRandomNumbers}" look like a random number sequence? Answer "Yes" or "No" without any explanation.`;
  const self_response = await zorp.chat(self_prompt);

  console.log({
    self_prompt_setup,
    aiGivenRandomNumbers,
    self_prompt,
    self_response,
  });

  expect(self_response).toBeTruthy();
  expect(self_response).toContain("Yes");
});
