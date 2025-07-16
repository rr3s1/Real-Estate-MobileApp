import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { login } from "@/lib/appwrite";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";

const SignIn = () => {
    // Access global context for authentication state and functions
    const { refetch, loading, isLogged } = useGlobalContext();

    // If the user is already logged in, redirect them to the home page
    if (!loading && isLogged) return <Redirect href="/" />;

    // Handle the login process when the user clicks the button
    const handleLogin = async () => {
        const result = await login();

        // If login is successful, refetch user data to update global state
        if (result) {
            refetch();
        } else {
            // Show an error alert if login fails
            Alert.alert("Error", "Failed to login");
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <Image
                    source={images.onboarding}
                    className="w-full h-4/6"
                    resizeMode="contain"
                />

                <View className="px-10">
                    <Text className="text-base text-center uppercase font-rubik text-black-200">
                        Welcome To Real Estate
                    </Text>

                    <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                        Let's Get You Closer To {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                    </Text>

                    <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                        Login to Real Estate with Google
                    </Text>

                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={icons.google}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;