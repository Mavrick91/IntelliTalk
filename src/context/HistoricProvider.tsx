import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import uuid from "react-native-uuid";

import { generatedRandomColorFromTable } from "../../utils";
import { MessageThread, Thread } from "../types/historic";

type HistoricContextType = {
  threads: Thread[];
  selectedThread: Thread;
  addMessage: (newMessage?: MessageThread) => void;
  removeLastMessage: () => void;
  createThread: () => Promise<Thread>;
  deleteThread: (threadId: string) => Promise<Thread>;
  updateSelectedThread: (threadId: string) => void;
};

const HistoricContext = createContext<HistoricContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const defaultHistoric: Thread[] = [
  {
    id: uuid.v4() as string,
    userColor: generatedRandomColorFromTable(),
    createdAt: new Date().toISOString(),
    messages: [],
  },
];

const HistoricProvider = ({ children }: Props) => {
  const [messageThread, setMessageThread] = useState<Thread[]>(defaultHistoric);
  const [selectedThread, setSelectedThread] = useState<Thread>(
    messageThread[0]
  );

  const addMessage = useCallback(
    (newMessage: MessageThread) => {
      setMessageThread((prev) =>
        prev.map((item) => {
          const messages =
            item.id === selectedThread.id
              ? [...item.messages, newMessage]
              : item.messages;

          return {
            ...item,
            messages,
          };
        })
      );
    },
    [selectedThread]
  );

  const deleteThread = useCallback(
    async (threadId: string) => {
      if (messageThread.length === 1) {
        setMessageThread((prev) => [
          {
            ...prev[0],
            messages: [],
          },
        ]);
      } else {
        let nextOrPreviousThread = null;
        setMessageThread((prev) => {
          const newMessageThread = prev.filter((item, index) => {
            if (item.id === threadId) {
              if (prev[index - 1]) nextOrPreviousThread = prev[index - 1];
              else nextOrPreviousThread = prev[index + 1];
              return false;
            }
            return true;
          });
          setSelectedThread(nextOrPreviousThread);
          return newMessageThread;
        });
        return nextOrPreviousThread;
      }
    },
    [messageThread]
  );

  const removeLastMessage = useCallback(() => {
    setMessageThread((prev) =>
      prev.map((item) =>
        item.id === selectedThread.id
          ? {
              ...item,
              messages: item.messages.slice(0, item.messages.length - 1),
            }
          : item
      )
    );
  }, [selectedThread]);

  const createThread = useCallback(
    () =>
      new Promise<Thread>((resolve) => {
        if (selectedThread.messages.length === 0) {
          resolve(selectedThread);
        } else {
          const newThread: Thread = {
            id: uuid.v4() as string,
            userColor: generatedRandomColorFromTable(),
            createdAt: new Date().toISOString(),
            messages: [],
          };
          setMessageThread((prev) => [...prev, newThread]);
          setSelectedThread(newThread);
          resolve(newThread);
        }
      }),
    [selectedThread]
  );

  const updateSelectedThread = useCallback(
    (threadId: string) => {
      setSelectedThread(messageThread.find((thread) => thread.id === threadId));
    },
    [messageThread]
  );

  // We modify the selected thread when the messageThread changes
  useEffect(() => {
    setSelectedThread(
      messageThread.find((thread) => thread.id === selectedThread.id)
    );
  }, [messageThread, selectedThread]);

  return (
    <HistoricContext.Provider
      value={{
        threads: messageThread,
        selectedThread,
        addMessage: addMessage,
        removeLastMessage,
        createThread,
        deleteThread,
        updateSelectedThread,
      }}
    >
      {children}
    </HistoricContext.Provider>
  );
};

export const useHistoric = () => {
  const context = useContext(HistoricContext);
  if (context === null) {
    throw new Error("useHistoric must be used within a HistoricProvider");
  }
  return context;
};

export default HistoricProvider;
