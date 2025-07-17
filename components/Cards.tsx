import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
    onPress?: () => void;
}

// FeaturedCard is a larger, more prominent card with overlaid text.
export const FeaturedCard = ({ onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="flex flex-col items-start w-60 h-80 relative"
        >
            {/* Base image for the property */}
            <Image source={images.japan} className="size-full rounded-2xl" />

            {/* Gradient overlay to make text readable */}
            <Image
                source={images.cardGradient}
                className="size-full rounded-2xl absolute bottom-0"
            />

            {/* Absolutely positioned rating badge */}
            <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
                    4.4
                </Text>
            </View>

            {/* Absolutely positioned container for text content at the bottom */}
            <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
                <Text
                    className="text-xl font-rubik-extrabold text-white"
                    numberOfLines={1}
                >
                    The Willows
                </Text>
                <Text className="text-base font-rubik text-white" numberOfLines={1}>
                    12th Park Ave, London
                </Text>

                <View className="flex flex-row items-center justify-between w-full mt-1">
                    <Text className="text-xl font-rubik-extrabold text-white">
                        £3,000
                    </Text>
                    <Image source={icons.heart} className="size-5" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Card is a standard component where content is below the image.
export const Card = ({ onPress }: Props) => {
    return (
        <TouchableOpacity
            className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Rating badge positioned over the image */}
            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
                <Image source={icons.star} className="size-2.5" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
                    4.4
                </Text>
            </View>

            {/* Property image */}
            <Image source={images.newYork} className="w-full h-40 rounded-lg" />

            {/* Container for text content below the image */}
            <View className="flex flex-col mt-2">
                <Text className="text-base font-rubik-bold text-black-300">
                    Modern flat
                </Text>
                <Text className="text-xs font-rubik text-black-100">
                    5th Ave & 42nd St, New York
                </Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold text-primary-300">
                        $10,500
                    </Text>
                    <Image
                        source={icons.heart}
                        className="w-5 h-5 mr-2"
                        tintColor="#191D31"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};