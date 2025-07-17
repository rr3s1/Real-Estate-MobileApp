import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import Filters from "@/components/Filters";
import { Card, FeaturedCard } from "@/components/Cards";

// A mock user object for display purposes.
const user = {
    name: "Jane Doe",
    avatar: require("@/assets/images/avatar.png"),
};

export default function Index() {
    return (
        // SafeAreaView ensures content is displayed within the device's safe area.
        <SafeAreaView className="h-full bg-white">
            {/* ScrollView allows the entire page content to be scrollable vertically. */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="px-5">
                    {/* Header section with user greeting and notification bell */}
                    <View className="flex flex-row items-center justify-between mt-5">
                        <View className="flex flex-row">
                            <Image
                                source={user.avatar}
                                className="size-12 rounded-full"
                            />
                            <View className="flex flex-col items-start ml-2 justify-center">
                                <Text className="text-xs font-rubik text-black-100">
                                    Good Morning
                                </Text>
                                <Text className="text-base font-rubik-medium text-black-300">
                                    SRS
                                </Text>
                            </View>
                        </View>
                        <Image source={icons.bell} className="size-6" />
                    </View>

                    {/* Reusable search component */}
                    <Search />

                    {/* Featured Properties Section */}
                    <View className="my-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">
                                Featured
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-base font-rubik-bold text-primary-300">
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* A horizontal scroll view for featured cards */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5">
                            <View className="flex flex-row gap-5">
                                <FeaturedCard />
                                <FeaturedCard />
                            </View>
                        </ScrollView>
                    </View>

                    {/* Recommended Properties Section */}
                    <View className="mt-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">
                                Our Recommendation
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-base font-rubik-bold text-primary-300">
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* Reusable filters component */}
                        <Filters />
                        {/* A row for displaying standard property cards */}
                        <View className="flex flex-row gap-5 mt-2">
                            <Card />
                            <Card />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}