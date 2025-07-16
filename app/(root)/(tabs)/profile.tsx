import {
    Alert,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

// Defines the props for the SettingsItem component.
interface SettingsItemProp {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

// A reusable component for rendering a single settings item.
const SettingsItem = ({
                          icon,
                          title,
                          onPress,
                          textStyle,
                          showArrow = true, // Arrow is shown by default.
                      }: SettingsItemProp) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex flex-row items-center justify-between py-3"
    >
        <View className="flex flex-row items-center gap-3">
            <Image source={icon} className="size-6" />
            <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
                {title}
            </Text>
        </View>

        {/* Conditionally renders the right arrow icon. */}
        {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
);

const Profile = () => {
    // Retrieves user data and refetch function from the global context.
    const { user, refetch } = useGlobalContext();

    // Handles the user logout process.
    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            Alert.alert("Success", "Logged out successfully");
            refetch(); // Refetches user data to trigger redirect.
        } else {
            Alert.alert("Error", "Failed to logout");
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                {/* Profile screen header */}
                <View className="flex flex-row items-center justify-between mt-5">
                    <Text className="text-xl font-rubik-bold">Profile</Text>
                    <Image source={icons.bell} className="size-5" />
                </View>

                {/* User avatar, name, and edit button section */}
                <View className="flex flex-row justify-center mt-5">
                    <View className="flex flex-col items-center relative mt-5">
                        <Image
                            source={{ uri: user?.avatar }}
                            className="size-44 relative rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={icons.edit} className="size-9" />
                        </TouchableOpacity>

                        <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
                    </View>
                </View>

                {/* First group of settings items */}
                <View className="flex flex-col mt-10">
                    <SettingsItem icon={icons.calendar} title="My Bookings" />
                    <SettingsItem icon={icons.wallet} title="Payments" />
                </View>

                {/* Second group of settings items, mapped from data */}
                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} {...item} />
                    ))}
                </View>

                {/* Logout button section */}
                <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
                    <SettingsItem
                        icon={icons.logout}
                        title="Logout"
                        textStyle="text-danger" // Custom style for logout text.
                        showArrow={false} // Hides the arrow for this item.
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;