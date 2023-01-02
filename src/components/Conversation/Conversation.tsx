import { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { useHistoric } from "../../context/HistoricProvider";
import ConversationItem from "../ConversationItem";

const Conversation = () => {
  const [historic] = useHistoric();
  const ref = useRef<ScrollView>();

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [historic.length]);

  return (
    <ScrollView ref={ref}>
      {historic.map((item) => (
        <ConversationItem
          key={item.id as string}
          me={item.me}
          text={item.text}
          error={item.error}
        />
      ))}
    </ScrollView>
  );
};

export default Conversation;
