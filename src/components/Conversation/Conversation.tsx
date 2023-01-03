import { useEffect, useRef } from "react";
import { ScrollView } from "react-native";

import { useHistoric } from "../../context/HistoricProvider";
import ConversationItem from "../ConversationItem";

const Conversation = () => {
  const { selectedThread } = useHistoric();
  const ref = useRef<ScrollView>();

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [selectedThread.messages.length]);

  return (
    <ScrollView ref={ref}>
      {selectedThread.messages.map((message) => (
        <ConversationItem
          error={message.error}
          key={message.id as string}
          me={message.me}
          text={message.text}
          userColor={selectedThread.userColor}
        />
      ))}
    </ScrollView>
  );
};

export default Conversation;
