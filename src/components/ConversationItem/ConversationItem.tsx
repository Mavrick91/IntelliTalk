import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

type Props = {
  me: boolean;
  text: string;
};

const ConversationItem = ({ me, text }: Props) => {
  return (
    <View style={[styles.container, me ? styles.me : styles.notMe]}>
      <Image
        style={styles.image}
        source={
          me
            ? require("../../assets/user.png")
            : require("../../assets/user-ai.png")
        }
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
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
});

export default ConversationItem;