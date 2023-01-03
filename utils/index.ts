import uuid from "react-native-uuid";

import { MessageThread } from "../src/types/historic";

export const concatHistoricPrompt = (
  historic: MessageThread[],
  prompt: string
) => {
  const historicText = historic.reduce((acc, value) => {
    return acc + value.text + "\n\n";
  }, "");

  return historicText + prompt;
};

export const getFormattedErrorMessage = (code: string) => {
  switch (code) {
    case "invalid_api_key":
      return "A problem with the application occurred. Please try again later.";
    case "empty":
      return "An error occurred. Please try again later.";
    default:
      return null;
  }
};

export const generatedRandomColorFromTable = () => {
  const colors = [
    "#F0C40E",
    "#ef210e",
    "#0e24ef",
    "#0b894a",
    "#5f0b89",
    "#0b8989",
    "#0b895b",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateUuid = (): string => uuid.v4() as string;

export const sortByIsoDate = (a: string, b: string) => {
  return new Date(b).getTime() - new Date(a).getTime();
};
