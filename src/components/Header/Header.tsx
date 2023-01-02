import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useHistoric } from "../../context/HistoricProvider";
import ModalHistoric from "../Modals/ModalHistoric";

const Header = () => {
  const [, setHistoric] = useHistoric();
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <View
        className="flex-row justify-end w-full bg-[#343541] z-10"
        style={styles.shadow}
      >
        <IconButton
          onPress={() => setShowModal(true)}
          icon={(props) => (
            <Icon name="format-list-bulleted" {...props} color="#ACABBD" />
          )}
        />
        <IconButton
          onPress={() => setHistoric()}
          icon={(props) => <Icon name="delete" {...props} color="#ACABBD" />}
        />
      </View>
      {showModal && (
        <ModalHistoric
          data={[]}
          modal={{
            onRequestClose: () => setShowModal(false),
          }}
        />
      )}
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
