import React, { memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ListProps {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}

export const List = memo(({style, children}: ListProps) => {
    return (
        <View style={[{backgroundColor: "white", borderRadius: 10}, style]}>
            {children}
        </View>
    )
})