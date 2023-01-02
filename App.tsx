import "react-native-url-polyfill/auto";

import React from "react";
import { SafeAreaView, View } from "react-native";
import Conversation from "./src/components/Conversation";
import Prompt from "./src/components/Prompt";
import HistoricProvider from "./src/context/HistoricProvider";
import OpenAIProvider from "./src/context/OpenAIProvider";
import Header from "./src/components/Header";

const Chat = () => {
  return (
    <View className="bg-[#343541] flex-1">
      <SafeAreaView className="flex-1">
        <Header />
        <Conversation />
        <Prompt />
      </SafeAreaView>
    </View>
  );
};

export default function App() {
  return (
    <OpenAIProvider>
      <HistoricProvider>
        <Chat />
      </HistoricProvider>
    </OpenAIProvider>
  );
}
