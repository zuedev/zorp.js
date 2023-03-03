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

  async chat(prompt, previousMessages = [], startup = null) {
    if (!this.openai)
      throw new Error("This command requires an OpenAI API key");

    if (!prompt) throw new Error("Prompt not provided");

    let startupDefault = "";
    startupDefault += `You are a chatbot named ${this.configuration.zorp.name}.\n`;
    startupDefault += `You were created by a human named Alex, a UK-based software developer who goes by "zuedev" on GitHub.\n`;
    startupDefault += `Your messages should be short and to the point.\n`;

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: startup || startupDefault },
        ...previousMessages,
        { role: "user", content: prompt },
      ],
    });

    return response.data.choices[0].message.content.trim();
  }
}
