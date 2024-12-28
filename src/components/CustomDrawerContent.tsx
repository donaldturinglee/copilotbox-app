import { MainStackParamList } from "@/navigations/stack/MainStackNavigator";
import { DrawerContentScrollView, DrawerItemList, useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import {Keyboard, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import {colors} from "@/constants/colors.ts";
import Icon from "./Icon";

interface CustomDrawerContentProps {}

type Navigation = StackNavigationProp<MainStackParamList>

const mockChatHistory = [
    { id: '1', title: 'How to implement authentication', date: '2d ago' },
    { id: '2', title: 'React Native navigation setup', date: '3d ago' },
    { id: '3', title: 'Building custom components', date: '1w ago' },
  ];
  
  const ChatHistoryItem = ({ title, date }: { title: string; date: string }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.chatContent}>
        <Text numberOfLines={1} style={styles.chatTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  export const CustomDrawerContent = (props: any) => {
    const navigation = useNavigation<Navigation>();
    const {bottom, top} = useSafeAreaInsets();
    const isDrawerOpen = useDrawerStatus() === "open";
    
    useEffect(() => {
        Keyboard.dismiss();
    }, [isDrawerOpen]);

    return (
        <View style={{flex: 1, backgroundColor: colors.light.background}}>
            <View style={{ paddingBottom: 10, marginTop: top + 10}}>
                <View style={styles.headerContainer}>
                    <View style={styles.searchContainer}>
                        <Icon.SearchIcon
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Icon.EditIcon
                        style={styles.editIcon}
                        onPress={() => {
                            props.navigation.navigate("Chat", {reset: true});
                        }}
                    />
                </View>
            </View>

            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ 
                    paddingTop: 0, 
                    paddingStart: 0, 
                    paddingEnd: 0,
                    paddingBottom: 0
                }}
            >
                <DrawerItemList {...props} />
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 11 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "#E5E5E5" }} />
                </View>
                {/* <View>
                    <Text style={styles.sectionTitle}>Chats</Text>
                    {mockChatHistory.map((chat) => (
                        <ChatHistoryItem key={chat.id} title={chat.title} date={chat.date} />
                    ))}
                </View> */}
            </DrawerContentScrollView>
            
            <View style={{
                padding: 16,
                paddingBottom: bottom + 10,
                backgroundColor: colors.light.background
            }}>
                <View
                    onTouchEnd={() => navigation.navigate("Settings")}
                    style={styles.profile}
                >
                    <Image
                        source={require("@/assets/images/avatar.jpg")}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>Donald Lee</Text>
                    <Icon.DotsIcon />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        justifyContent: 'space-between',
    },
    searchContainer: {
        flex: 0.95,
        borderRadius: 5,
        height: 34,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light.border
    },
    searchInput: {
        flex: 1,
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingLeft: 0,
        alignItems: 'center',
        color: '#424242',
    },
    searchIcon: {
        padding: 6
    },
    editIcon: {
        padding: 6,
    },
    dividerContainer: {
        paddingHorizontal: 15,
        marginVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        width: "100%",
    },
    profile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#666666",
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 13,
    },
    chatContent: {
        flex: 1,
    },
    chatTitle: {
        fontSize: 14,
        color: '#333',
    },
    chatDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
});