import OpenAI from "openai";
import { envs } from "../env";

const openai = new OpenAI(
    {
        apiKey: envs.OPENAI_API_KEY
    }
);

export async function generatePost(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant designed to output JSON in portuguese",
      },
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: `The json must be in that format: {
                id: number;
                title: string;
                content: string;
                authorId: number;
                categoryId: number;
                createdAt: Date;
            }`,
      },
    ],
  });

  return completion.choices[0];
}
