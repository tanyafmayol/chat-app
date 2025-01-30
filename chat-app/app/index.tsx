import { Text, View } from "react-native";
import  LoginScreen from "./screens/LoginScreen/LoginScreen"
import SignupScreen from "./screens/SignupScreen/SignupScreen";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignupScreen></SignupScreen>
    </View>
  );
}
