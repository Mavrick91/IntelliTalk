import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { View } from "react-native";
import { useHistoric } from "../../context/HistoricProvider";

const Header = () => {
  const [, setHistoric] = useHistoric();

  return (
    <View className="border border-solid border-red-50 flex-row justify-end w-full">
      <IconButton
        onPress={() => setHistoric()}
        icon={(props) => <Icon name="delete" {...props} color="#ACABBD" />}
      />
    </View>
  );
};

export default Header;
