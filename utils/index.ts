import { Historic } from "../src/types/historic";

export const concatHistoricPrompt = (historic: Historic[], prompt: string) => {
  const historicText = historic.reduce((acc, value) => {
    return acc + value.text + "\n\n";
  }, "");

  return historicText + prompt;
};
