import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { Button } from "@rneui/themed";
import { ScrollView, Text, View, StyleSheet, ModalProps } from "react-native";
import Modal from "../../Modal";

type Props = {
  data: any[];
  modal: ModalProps;
};

const ModalHistoric = ({ data, modal }: Props) => {
  return (
    <Modal {...modal}>
      <View
        className="m-5 rounded-xl bg-[#2A2B31] items-center w-5/6 max-h-[352] min-h-[352]"
        style={styles.shadow}
      >
        <ScrollView className="w-full">
          {data.map((item) => {
            return (
              <View
                className={"w-full px-2 py-2 flex-row items-center"}
                key={item}
              >
                <IconButton
                  className=""
                  onPress={() => {
                    return;
                  }}
                  icon={(props) => (
                    <Icon name="forum-outline" {...props} color="#ACABBD" />
                  )}
                />
                <Text key={item} className="text-white ">
                  {item}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View
          className="w-full items-end justify-center pr-8 py-3 self-end"
          style={styles.shadow}
        >
          <Button
            title="Close"
            buttonStyle={{
              backgroundColor: "#40414F",
              borderRadius: 5,
              paddingHorizontal: 20,
            }}
            onPress={modal.onRequestClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default ModalHistoric;
