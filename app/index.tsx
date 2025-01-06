import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Text className="font-bold text-lg my-10">Welcome to ReState</Text>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/profile">Profile In</Link>
        <Link href="/properties/1">Properties</Link>
    </View>
  );
}
