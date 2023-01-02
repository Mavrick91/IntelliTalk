import { Configuration, OpenAIApi } from "openai";
import { createContext, useContext } from "react";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const OpenAIContext = createContext<OpenAIApi | null>(null);

type Props = {
  children: React.ReactNode;
};

const OpenAIProvider = ({ children }: Props) => {
  return (
    <OpenAIContext.Provider value={openai}>{children}</OpenAIContext.Provider>
  );
};

export const useOpenAI = () => {
  const context = useContext(OpenAIContext);
  if (context === null) {
    throw new Error("useOpenAI must be used within a OpenAIProvider");
  }
  return context;
};

export default OpenAIProvider;
