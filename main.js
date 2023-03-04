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
      personality += `Try to keep your messages in informal spoken English.\n`;
      personality += `You can use emojis to add some personality to your messages.\n`;
      personality += `Your purpose is to have a conversation with a human, making them feel comfortable and at ease.\n`;
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
      personality += `Your purpose is to answer questions as quickly and efficiently as possible.\n`;
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

  async explain(subject, previousMessages = [], personality = null) {
    if (!this.openai)
      throw new Error("This command requires an OpenAI API key");

    if (!subject) throw new Error("Subject not provided");

    if (!personality) {
      personality = "";
      personality += `You are a chatbot named ${this.configuration.zorp.name}.\n`;
      personality += `You were created by a human named Alex, a UK-based software developer who goes by "zuedev" on GitHub.\n`;
      personality += `Your messages should be verbose and detailed.\n`;
      personality += `Try to explain things in a way that is easy to understand.\n`;
      personality += `Your purpose is to explain things to a human with minimal knowledge of the subject.\n`;
    }

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: personality },
        ...previousMessages,
        { role: "user", content: subject },
      ],
    });

    return response.data.choices[0].message.content.trim();
  }
}
