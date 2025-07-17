import {Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import images from "@/constants/images";

export default function Index() {
    return (
        // SafeAreaView ensures content is displayed within the device's safe area, avoiding notches and system bars.
        <SafeAreaView className="h-full bg-white">
            {/* This View provides consistent horizontal padding for all screen content. */}
            <View className="px-5">
                {/* Header container with flex properties for alignment. */}
                <View className="flex flex-row items-center justify-between mt-5">
                    {/* Container for the user's avatar and greeting text. */}
                    <View className="flex flex-row">
                        <Image
                            source={images.avatar}
                            className="size-12 rounded-full"
                        />

                        {/* Container for the two lines of greeting text. */}
                        <View className="flex flex-col items-start ml-2 justify-center">
                            <Text className="text-xs font-rubik text-black-100">
                                Good Morning
                            </Text>
                            <Text className="text-base font-rubik-medium text-black-300">
                                SRS
                            </Text>
                        </View>
                    </View>
                    {/* Notification bell icon. */}
                    <Image source={icons.bell} className="size-6" />
                </View>

                {/* Reusable Search component is rendered here. */}
                <Search />

                {/* Container for the 'Featured' section. */}
                <View className="my-5">
                    {/* Header for the 'Featured' section, arranging title and link. */}
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-rubik-bold text-black-300">
                            Featured
                        </Text>
                        {/* A touchable link to see all featured items. */}
                        <TouchableOpacity>
                            <Text className="text-base font-rubik-bold text-primary-300">
                                See all
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )};