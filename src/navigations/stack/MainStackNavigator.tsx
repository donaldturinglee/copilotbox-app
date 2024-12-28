import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { mainNavigation } from "@/constants/settings";
import { MainDrawerNavigator } from "../drawer/MainDrawerNavigator";
import { useNavigation } from "@react-navigation/native";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { colors } from "@/constants/colors";
import Icon from "@/components/Icon";
import { AboutScreen } from "@/screens/AboutScreen";
import { IsIOS } from "@/utility/platform";
import { AuthStackNavigator } from "./AuthStackNavigator";
import { ModelScreen } from "@/screens/ModelScreen";
import { OpenAISettingsScreen } from "@/screens/OpenAISettingsScreen";
import { DataControlsScreen } from "@/screens/DataControlsScreen";

export type MainStackParamList = {
    [mainNavigation.DRAWER]: undefined;
    [mainNavigation.SETTINGS]: undefined;
    [mainNavigation.ABOUT]: undefined;
    [mainNavigation.AUTH]: undefined;
    [mainNavigation.MODEL]: undefined;
    [mainNavigation.OPENAI_SETTINGS]: undefined;
    [mainNavigation.DATA_CONTROLS]: undefined;

};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStackNavigator = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={mainNavigation.DRAWER}
                component={MainDrawerNavigator}
            />
            <Stack.Screen
                name={mainNavigation.SETTINGS}
                component={SettingsScreen}
            />
            <Stack.Screen 
                name={mainNavigation.ABOUT}
                component={AboutScreen}
            />
            <Stack.Screen 
                name={mainNavigation.MODEL}
                component={ModelScreen}
            />
            <Stack.Screen 
                name={mainNavigation.OPENAI_SETTINGS}
                component={OpenAISettingsScreen}
            />
            <Stack.Screen
                name={mainNavigation.AUTH}
                component={AuthStackNavigator}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen 
                name={mainNavigation.DATA_CONTROLS}
                component={DataControlsScreen}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});
