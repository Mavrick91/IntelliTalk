import { DrawerScreenProps } from "@react-navigation/drawer";
import { useCallback, useEffect } from "react";
import { SafeAreaView, View } from "react-native";

import Conversation from "../../components/Conversation";
import Header from "../../components/Header";
import Prompt from "../../components/Prompt";
import { useHistoric } from "../../context/HistoricProvider";
import { Thread } from "../../types/historic";
import { RootStackParamList } from "../../types/navigation";

type Props<ComponentName extends keyof RootStackParamList> = DrawerScreenProps<
  RootStackParamList,
  ComponentName
>;

const Chat = ({ navigation, route }: Props<string>) => {
  const { updateSelectedThread } = useHistoric();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      updateSelectedThread(route.params.threadId);
    });

    return unsubscribe;
  }, [navigation, route.params.threadId, updateSelectedThread]);

  const openDrawer = useCallback(() => navigation.openDrawer(), [navigation]);

  const navigationToNewChatCreated = useCallback(
    (thread: Thread) => {
      navigation.navigate(thread.id, {
        threadId: thread.id,
      });
    },
    [navigation]
  );

  const navigationToPreviousChat = useCallback(
    (previousThread: Thread) => {
      navigation.navigate(previousThread.id, {
        threadId: previousThread.id,
      });
    },
    [navigation]
  );

  return (
    <View className="bg-[#343541] flex-1">
      <SafeAreaView className="flex-1">
        <Header
          navigationToNewChatCreated={navigationToNewChatCreated}
          navigationToPreviousChat={navigationToPreviousChat}
          openDrawer={openDrawer}
        />
        <Conversation />
        <Prompt />
      </SafeAreaView>
    </View>
  );
};

export default Chat;
