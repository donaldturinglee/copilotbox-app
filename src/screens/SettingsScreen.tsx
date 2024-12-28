import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@/components/Icon";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { colors } from "@/constants/colors";


export const SettingsScreen = (props: any) => {
    const navigation = useNavigation<any>();
    
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "Settings",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: colors.light.background,
            },
            headerLeft: () => (
                <Icon.ChevronLeftIcon onPress={() => navigation.goBack()} />
            ),
            headerTitleAlign: "center",
        })
    }, []);

    return (
        <ScrollView 
            style={{flex: 1, backgroundColor: colors.light.background}}
            contentContainerStyle={{paddingBottom: 40}}
        >
            <View style={{backgroundColor: 'white', padding: 16}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image 
                        source={require('@/assets/images/avatar.jpg')}
                        style={{width: 60, height: 60, borderRadius: 30, marginRight: 12}}
                    />
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 20, fontWeight: '600'}}>Donald Lee</Text>
                        <Text style={{color: '#666', marginTop: 4}}>donaldturinglee@gmail.com</Text>
                    </View>
                    <Icon.ChevronRightIcon style={{opacity: 0.6}} />
                </View>
            </View>

            <View style={{marginHorizontal: 8}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 11 }}>
                    <Text style={{
                        fontSize: 17,
                        marginRight: 15
                    }}>General</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#8E8E93' }} />
                </View>
                <List>
                    <ListItem 
                        icon={<Icon.CopilotIcon />}
                        title="Model"
                        hasScreen
                        onPress={() => {
                            navigation.navigate("Model");
                        }}
                    />
                    <ListItem 
                        icon={<Icon.DataBaseConfigIcon />}
                        title="Data Settings"
                        hasScreen
                        onPress={() => {
                            navigation.navigate("DataControls");
                        }}
                    />
                </List>
            </View>

            <View style={{marginHorizontal: 8, marginBottom: 20}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 11 }}>
                    <Text style={{
                        fontSize: 17,
                        marginRight: 15,
                    }}>About</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#8E8E93' }} />
                </View>
                <List>
                    <ListItem 
                        icon={<Icon.HelpIcon />}
                        title="Help Center"
                    />
                    <ListItem 
                        icon={<Icon.LockIcon />}
                        title="Privacy Policy"
                    />
                    <ListItem 
                        icon={<Icon.AboutIcon />}
                        title="About CopilotBox"
                        hasScreen
                        onPress={() => navigation.navigate("About")}
                    />
                </List>
            </View>

            {/* Logout Section */}
            {/* <View style={{marginHorizontal: 8, marginBottom: 20}}>
                <List>
                    <ListItem 
                        icon={<Icon.SignOutIcon />}
                        title="Sign Out"
                        onPress={() => {
                            navigation.navigate("Auth", {screen: "Signin"});
                        }}
                    />
                </List>
            </View> */}
        </ScrollView>
    );
};