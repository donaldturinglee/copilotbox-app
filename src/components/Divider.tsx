import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

interface DividerProps {
    color?: string;
    style?: StyleProp<ViewStyle>;
}

export const Divider = ({color = "#E5E5E5", style}: DividerProps) => {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center'}, style]}>
            <View style={{ flex: 1, height: 1, backgroundColor: color }} />
        </View>
    )
}