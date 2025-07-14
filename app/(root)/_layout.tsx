import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/lib/global-provider";

// This is the layout for protected routes that require authentication.
export default function AppLayout() {
    const { loading, isLogged } = useGlobalContext();

    // While checking the auth status, show a loading indicator.
    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary-300" size="large" />
            </SafeAreaView>
        );
    }

    // If the user is not logged in, redirect them to the sign-in page.
    if (!isLogged) {
        return <Redirect href="/sign-in" />;
    }

    // If the user is authenticated, render the current screen (child route).
    return <Slot />;
}