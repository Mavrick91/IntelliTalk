import { useOpenAI } from "../context/OpenAIProvider";

const useCreateCompletion = () => {
  const openai = useOpenAI();

  const createCompletion = (prompt: string) => {
    return openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  };

  return createCompletion;
};

export default useCreateCompletion;
