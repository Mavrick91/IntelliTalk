import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useHistoric } from "../../context/HistoricProvider";
import { Thread } from "../../types/historic";

type Props = {
  openDrawer: () => void;
  navigationToNewChatCreated: (thread: Thread) => void;
  navigationToPreviousChat: (thread: Thread) => void;
};

const Header = ({
  openDrawer,
  navigationToNewChatCreated,
  navigationToPreviousChat,
}: Props) => {
  const { createThread, deleteThread, selectedThread } = useHistoric();

  const handlePressDelete = useCallback(async () => {
    const ThreadIdToNavigate = await deleteThread(selectedThread.id);
    if (ThreadIdToNavigate) navigationToPreviousChat(ThreadIdToNavigate);
  }, [deleteThread, navigationToPreviousChat, selectedThread.id]);

  return (
    <View className="z-20">
      <View
        className="flex-row justify-end w-full bg-[#343541] z-20"
        style={styles.shadow}
      >
        <IconButton
          icon={(props) => (
            <Icon name="format-list-bulleted" {...props} color="#ACABBD" />
          )}
          onPress={() => openDrawer()}
        />
        <IconButton
          icon={(props) => (
            <Icon name="plus-circle-outline" {...props} color="#ACABBD" />
          )}
          onPress={() => createThread().then(navigationToNewChatCreated)}
        />
        <IconButton
          icon={(props) => <Icon name="delete" {...props} color="#ACABBD" />}
          onPress={handlePressDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 200,
    shadowOpacity: 0.2,
    shadowRadius: 5.65,
  },
});

export default Header;
