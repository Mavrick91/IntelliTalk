import { Historic } from "../src/types/historic";

export const concatHistoricPrompt = (historic: Historic[], prompt: string) => {
  const historicText = historic.reduce((acc, value) => {
    return acc + value.text + "\n\n";
  }, "");

  return historicText + prompt;
};

export const getFormattedErrorMessage = (code: string) => {
  switch (code) {
    case "invalid_api_key":
      return "Your message hasn't been sent. Please try again later.";
    default:
      return null;
  }
};
