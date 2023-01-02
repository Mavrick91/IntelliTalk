import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { concatHistoricPrompt } from "../../../utils";
import { useHistoric } from "../../context/HistoricProvider";
import useCreateCompletion from "../../hooks/useCreateCompletion";

const Prompt = () => {
  const [inputValue, setInputValue] = useState("");
  const [historic, setHistoric, removeLastMessage] = useHistoric();

  const createCompletion = useCreateCompletion();

  const handlePress = useCallback(() => {
    setHistoric({ me: true, text: inputValue.trim(), id: uuid.v4() });
    setHistoric({ me: false, text: "...", id: uuid.v4() });
    setInputValue("");

    const concatHistoricText = concatHistoricPrompt(historic, inputValue);

    createCompletion(concatHistoricText)
      .then((response) => {
        removeLastMessage();
        setHistoric({
          me: false,
          text: response.data.choices[0].text.trim(),
          id: uuid.v4(),
        });
      })
      .catch((error) => {
        // setHistoric({ me: false, text: inputValue.trim(), id: uuid.v4() });
        console.log("🚀 ~ error", error.response);
      });
  }, [inputValue]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-row relative bg-[#40414F] px-4 py-2 mx-auto">
        <TextInput
          className="flex-1 text-white py-2"
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Write something..."
          placeholderTextColor={"#fff"}
        />
        <IconButton
          className="absolute right-0"
          disabled={!inputValue}
          onPress={handlePress}
          icon={(props) => <Icon name="send" {...props} color="#ACABBD" />}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Prompt;
