import { TextInput, StyleSheet } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const InputText = ({ value, onChangeText }: Props) => {
  return (
    <TextInput
      className="border text-white"
      onChangeText={onChangeText}
      value={value}
      style={styles.textInput}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: "white",
    border: "1px solid red",
    backgroundColor: "#242A2A",
    padding: 8,
  },
});

export default InputText;
