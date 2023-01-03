import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { MessageThread, Thread } from "../../types/historic";

type Props = Pick<Thread, "userColor"> & Omit<MessageThread, "id">;

const ConversationItem = ({ me, text, error, userColor }: Props) => {
  return (
    <View style={[styles.container, me ? styles.me : styles.notMe]}>
      {me ? (
        <View
          className={"h-10 w-10 rounded mr-4 items-center justify-center"}
          style={{ backgroundColor: userColor }}
        >
          <Text className="text-white text-lg">U</Text>
        </View>
      ) : (
        <Image
          className="h-10 w-10 rounded mr-4 items-center justify-center"
          source={require("../../assets/logo.png")}
        />
      )}

      <Text style={[styles.text, error ? styles.error : null]} selectable>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  AIColor: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  me: {
    backgroundColor: "#343541",
  },
  notMe: {
    backgroundColor: "#434654",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  error: {
    color: "#f4212e",
  },
});

export default ConversationItem;
