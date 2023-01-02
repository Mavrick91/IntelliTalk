import { Modal as ModalRN, ModalProps, View } from "react-native";

type Props = {
  children: React.ReactNode;
} & ModalProps;

const Modal = ({ children, ...modalProps }: Props) => {
  return (
    <View className="flex-1 items-center justify-center mt-5">
      <ModalRN animationType="fade" transparent={true} visible {...modalProps}>
        <View className="flex-1 items-center justify-center">{children}</View>
      </ModalRN>
    </View>
  );
};

export default Modal;
