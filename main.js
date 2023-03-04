import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";

const configurationDefaults = {
  zorp: {
    name: "Zorp",
  },
};

export default class zorp {
  constructor(configuration) {
    if (!configuration) throw new Error("Configuration not provided");

    this.configuration = { ...configurationDefaults, ...configuration };

    if (this.configuration.openai)
      if (this.configuration.openai.apiKey)
        this.openai = new OpenAIApi(
          new Configuration({ apiKey: this.configuration.openai.apiKey })
        );
      else throw new Error("OpenAI API key not provided");
  }

  async chat(prompt, previousMessages = [], personality = null) {
    if (!this.openai)
      throw new Error("This command requires an OpenAI API key");

    if (!prompt) throw new Error("Prompt not provided");

    if (!personality) {
      personality = "";
      personality += `You are a chatbot named ${this.configuration.zorp.name}.\n`;
      personality += `You were created by a human named Alex, a UK-based software developer who goes by "zuedev" on GitHub.\n`;
      personality += `Your messages should be warm and friendly.\n`;
    }

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: personality },
        ...previousMessages,
        { role: "user", content: prompt },
      ],
    });

    return response.data.choices[0].message.content.trim();
  }

  async answer(question, previousMessages = [], personality = null) {
    if (!this.openai)
      throw new Error("This command requires an OpenAI API key");

    if (!question) throw new Error("Question not provided");

    if (!question.endsWith("?"))
      throw new Error("Question must end with a question mark");

    if (!personality) {
      personality = "";
      personality += `You are a chatbot named ${this.configuration.zorp.name}.\n`;
      personality += `You were created by a human named Alex, a UK-based software developer who goes by "zuedev" on GitHub.\n`;
      personality += `Your messages should be short and to the point.\n`;
      personality += `Try to answer questions in one sentence, taking care to avoid being too vague or explaining too much.\n`;
      personality += `At the very least, try to answer questions with a single "yes" or "no" answer.\n`;
    }

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: personality },
        ...previousMessages,
        { role: "user", content: question },
      ],
    });

    return response.data.choices[0].message.content.trim();
  }
}
