import { Divider } from '@/components/Divider';
import Icon from '@/components/Icon';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { colors } from '@/constants/colors';
import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Linking, Image } from 'react-native';

export const AboutScreen = (props: any) => {
    
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "About",
                headerShadowVisible: false,
                headerLeft: () => (
                    <Icon.ChevronLeftIcon 
                        onPress={() => props.navigation.goBack()}
                    />
            ),
            headerTitleAlign: "center"
        })
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1, 
                backgroundColor: colors.light.background
            }} 
        >
            <View style={{
                alignItems: 'center',
                marginVertical: 20,
            }}>
                <Image 
                    source={require('@/assets/images/copilot.png')}
                    style={{
                        width: 64,
                        height: 64,
                        marginBottom: 16,
                        borderRadius: 50
                    }}
                />
                <Text style={{
                    fontSize: 20,
                    fontWeight: '500',
                }}>CopilotBox v0.0.1</Text>
                
            </View>
            <Divider style={{paddingHorizontal: 15,marginBottom: 10}} />
            <View style={{flex: 1}}>
                <List>
                    <ListItem
                        icon={<Icon.GithubIcon />}
                        title="Github"
                        hasScreen
                        onPress={() => Linking.openURL("https://github.com/donaldturinglee/copilotbox-app")}
                    />
                    <ListItem
                        icon={<Icon.MailBoxIcon />}
                        title="Feedback"
                        hasScreen
                        onPress={() => Linking.openURL("mailto:donaldturinglee@gmail.com")}
                    />
                    <ListItem
                        icon={<Icon.DiscordIcon />}
                        title="Follow us on Discord Server"
                        hasScreen
                        onPress={() => Linking.openURL("https://discord.gg/YsteKRjrSH")}
                    />
                    <ListItem
                        icon={<Icon.TwitterIcon />}
                        title="Follow us on Social Media"
                        hasScreen
                        onPress={() => Linking.openURL("https://x.com/donaldturinglee")}
                    />
                </List>
            </View>
        </SafeAreaView>
    );
};