import { Text, View } from "react-native";
import  LoginScreen from "./screens/LoginScreen/LoginScreen"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginScreen></LoginScreen>
    </View>
  );
}
