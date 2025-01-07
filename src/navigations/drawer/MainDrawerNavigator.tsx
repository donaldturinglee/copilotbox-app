import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { colors } from "@/constants/colors";
import { mainNavigation } from "@/constants/settings";
import { ChatScreen } from "@/screens/ChatScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Platform, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React, { useEffect } from "react";
import Icon from "@/components/Icon";
import { ResetConversation } from "@/utility/conversationHistory";

export type MainDrawerParamList = {
    [mainNavigation.CHAT]:undefined;
    [mainNavigation.DRAWER]: undefined;
    [mainNavigation.EXPLORE]: undefined;
    [mainNavigation.AUTH]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();


export const MainDrawerNavigator = (props: any) => {
    const dimensions = useWindowDimensions();
   
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: false,
            headerShadowVisible: false,
            headerTitleAlign: "center",
        });
    }, [])

    return (
        <Drawer.Navigator
            initialRouteName="Chat"
            drawerContent={CustomDrawerContent}
            screenOptions={({navigation}) => ({
                headerStyle: {
                    backgroundColor: colors.light.background,
                },
                headerShadowVisible: false,
                drawerActiveBackgroundColor: colors.light.selected,
                drawerActiveTintColor: "#000000",
                drawerInactiveTintColor: "#000000",
                overlayColor: "rgba(0, 0, 0, 0.2)",
                drawerItemStyle: { borderRadius: 0 },
                drawerStyle: { width: dimensions.width * 0.86 },
                headerLeft: () => (
                    <View onTouchEnd={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Icon.MenuIcon size={24} style={{marginLeft: 15}} />
                    </View>
                ),
            })}
        >
            <Drawer.Screen
                name={mainNavigation.CHAT}
                component={ChatScreen}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({

});
