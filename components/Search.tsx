import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import icons from "@/constants/icons";
import { useLocalSearchParams, router, usePathname } from "expo-router";

const Search = () => {
    // Hooks from expo-router to interact with the current route and its parameters.
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();

    // State to manage the text input's value, initialized with the URL query parameter.
    const [search, setSearch] = useState(params.query);

    // Debounced function to delay updating the URL, reducing requests while typing.
    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text });
    }, 500); // 500ms delay

    // Handler for the text input's onChangeText event.
    const handleSearch = (text: string) => {
        setSearch(text); // Update the local state immediately for a responsive UI.
        debouncedSearch(text); // Trigger the debounced URL update.
    };

    return (
        // Main container for the search bar with styling.
        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
            {/* Inner container for the search icon and text input field. */}
            <View className="flex-1 flex flex-row items-center justify-start z-50">
                <Image source={icons.search} className="size-5" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search for anything"
                    className="text-sm font-rubik text-black-300 ml-2 flex-1"
                />
            </View>

            {/* A touchable icon for applying search filters. */}
            <TouchableOpacity>
                <Image source={icons.filter} className="size-5" />
            </TouchableOpacity>
        </View>
    );
};

export default Search;