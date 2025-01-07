import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authNavigation } from "@/constants/settings";
import { SignInScreen } from "@/screens/SignInScreen";
import { StyleSheet } from "react-native";
import { SignUpScreen } from "@/screens/SignUpScreen";
import React, { useEffect } from "react";
export type AuthStackParamList = {
    [authNavigation.SIGNIN]: undefined;
    [authNavigation.SIGNUP]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={authNavigation.SIGNIN}
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={authNavigation.SIGNUP}
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>

    );
};

const styles = StyleSheet.create({});
