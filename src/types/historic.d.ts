import { ReactNode } from "react";

export type MessageThread = {
  me: boolean;
  text: string | ReactNode;
  id: string;
  error?: boolean;
};

export type Thread = {
  id: string;
  createdAt: string;
  userColor: string;
  messages: MessageThread[];
};
