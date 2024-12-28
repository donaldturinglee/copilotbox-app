import React, { memo } from "react";
import { View, Text, GestureResponderEvent, StyleProp, ViewStyle, TextStyle, Pressable } from "react-native";
import Icon from "./Icon";
import { colors } from "@/constants/colors";

interface ListItemProps {
    icon?: React.ReactNode;
    title: string;
    label?: React.ReactNode;
    titleColor?: string,
    labelColor?: string,
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    hasScreen?: boolean;
    onPress?: ((event: GestureResponderEvent) => void);
}

export const ListItem = memo(({
    icon,
    title,
    label,
    titleColor = colors.black,
    labelColor = "#8E8E93",
    style,
    titleStyle,
    hasScreen,
    onPress,
    contentContainerStyle,
}: ListItemProps) => {
    return (
        <View 
            onTouchEnd={onPress} 
            style={[
                {
                    flexDirection: "row",
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    minHeight: 44
                },
                style
            ]}
        >
            {
                icon &&
                <View style={{paddingLeft: 16}}>
                    {icon}
                </View>
            }
            
            <View style={[
                {
                    flex: 1,
                    paddingVertical: 12,
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                contentContainerStyle
            ]}>
                <Text style={[
                    {fontSize: 17, color: titleColor, fontWeight: '400'},
                    titleStyle
                ]}>{title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {   label && 
                        <Text style={{fontSize: 17, color: labelColor, marginRight: 8}}>
                            {label}
                        </Text>
                    }
                    {hasScreen && <Icon.ChevronRightIcon style={{opacity: .6}} />}
                </View>
            </View>
        </View>
    );
});