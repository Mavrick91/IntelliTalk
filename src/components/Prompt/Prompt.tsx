import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { useCallback, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";

import { concatHistoricPrompt, getFormattedErrorMessage } from "../../../utils";
import { generateUuid } from "../../../utils/index";
import { useHistoric } from "../../context/HistoricProvider";
import useCreateCompletion from "../../hooks/useCreateCompletion";

const Prompt = () => {
  const [inputValue, setInputValue] = useState("");
  const { selectedThread, addMessage, removeLastMessage } = useHistoric();

  const createCompletion = useCreateCompletion();

  const handleAPIResponse = useCallback(
    (concatHistoricText) => {
      createCompletion(concatHistoricText)
        .then((response) => {
          const text = response.data.choices[0].text.trim();

          if (text === "") throw new Error("empty");

          removeLastMessage();
          addMessage({
            me: false,
            text: response.data.choices[0].text.trim(),
            id: generateUuid(),
          });
        })
        .catch((error) => {
          let code = error.message;
          if (error.response) code = error.response.data.error.code;

          removeLastMessage();
          addMessage({
            me: false,
            text: getFormattedErrorMessage(code),
            id: generateUuid(),
            error: true,
          });
        });
    },
    [addMessage, createCompletion, removeLastMessage]
  );

  const handlePressSubmit = useCallback(() => {
    const myMessage = { me: true, text: inputValue.trim(), id: generateUuid() };

    addMessage(myMessage);
    addMessage({
      me: false,
      text: (
        <TypingAnimation
          dotAmplitude={3}
          dotColor="white"
          dotMargin={10}
          dotRadius={3}
          dotSpeed={0.15}
          dotX={12}
          dotY={-1}
        />
      ),
      id: generateUuid(),
    });
    setInputValue("");

    const concatHistoricText = concatHistoricPrompt(
      selectedThread.messages,
      inputValue
    );

    handleAPIResponse(concatHistoricText);
  }, [addMessage, handleAPIResponse, inputValue, selectedThread.messages]);

  const handlePressRefresh = useCallback(() => {
    removeLastMessage();

    const concatHistoricText = concatHistoricPrompt(
      selectedThread.messages,
      inputValue
    );

    addMessage({ me: false, text: "...", id: generateUuid() });

    handleAPIResponse(concatHistoricText);
  }, [
    addMessage,
    handleAPIResponse,
    inputValue,
    removeLastMessage,
    selectedThread.messages,
  ]);

  const hasCompletionError = useMemo(
    () => selectedThread.messages.some((message) => message.error),
    [selectedThread]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-row relative bg-[#40414F] px-4 py-2 mx-auto items-center">
        <TextInput
          className="flex-1 text-white py-2"
          placeholder="Write something..."
          placeholderTextColor={"#fff"}
          value={inputValue}
          multiline
          onBlur={() => setInputValue(inputValue.trim())}
          onChangeText={setInputValue}
        />
        <IconButton
          disabled={!inputValue}
          icon={(props) => <Icon name="send" {...props} color="#ACABBD" />}
          onPress={handlePressSubmit}
        />
        {hasCompletionError && (
          <IconButton
            icon={(props) => <Icon name="refresh" {...props} color="#ACABBD" />}
            onPress={handlePressRefresh}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Prompt;
