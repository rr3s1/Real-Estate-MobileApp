import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { categories } from "@/constants/data";

const Filters = () => {
    // Reads the 'filter' parameter from the current URL.
    const params = useLocalSearchParams<{ filter?: string }>();

    // Manages the state of the selected category, defaulting to the URL param or "All".
    const [selectedCategory, setSelectedCategory] = useState(
        params.filter || "All"
    );

    // Handles logic for when a filter category is pressed.
    const handleCategoryPress = (category: string) => {
        // If the same category is pressed again, reset the filter.
        if (selectedCategory === category) {
            setSelectedCategory("All");
            router.setParams({ filter: "All" });
            return;
        }

        // Otherwise, set the new category as active.
        setSelectedCategory(category);
        router.setParams({ filter: category });
    };

    return (
        // A horizontal scroll view allows for swiping through categories.
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 mb-2"
        >
            {/* Map through the predefined categories to create filter chips. */}
            {categories.map((item, index) => (
                <TouchableOpacity
                    onPress={() => handleCategoryPress(item.category)}
                    key={index}
                    // Apply dynamic styling based on whether the category is selected.
                    className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
                        selectedCategory === item.category
                            ? "bg-primary-300"
                            : "bg-primary-100 border border-primary-200"
                    }`}
                >
                    <Text
                        // Apply dynamic text styling for the selected category.
                        className={`text-sm ${
                            selectedCategory === item.category
                                ? "text-white font-rubik-bold mt-0.5"
                                : "text-black-300 font-rubik"
                        }`}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Filters;