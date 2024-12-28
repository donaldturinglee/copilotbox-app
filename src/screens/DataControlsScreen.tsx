import Icon from "@/components/Icon"
import { List } from "@/components/List"
import { ListItem } from "@/components/ListItem"
import { colors } from "@/constants/colors"
import { resetAllSettings } from "@/store/modelSettingsSlice"
import { storage } from "@/utility/storage"
import { useCallback, useEffect } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"

export const DataControlsScreen = (props: any) => {

    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "Data Controls",
            headerShadowVisible: false,
            headerLeft: () => (
                <Icon.ChevronLeftIcon 
                    onPress={() => props.navigation.goBack()}
                />
            ),
            headerTitleAlign: "center"
        })
    })

    const handleResetAllSettings = useCallback(async () => {
        Alert.alert(
            "Reset All Settings",
            "Are you sure you want to reset all settings? This cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: async() => {
                        await storage.clear()
                        dispatch(resetAllSettings())
                    }
                }
            ]
        );
    }, []);

    return (
        <ScrollView
            style={{flex: 1, backgroundColor: colors.light.background}}
            contentContainerStyle={{paddingBottom: 40}}
        >

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
                        title="Reset All settings"
                        onPress={handleResetAllSettings}
                    />
                </List>
            </View>

            <View style={{marginHorizontal: 8}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 11 }}>
                    <Text style={{
                        fontSize: 17,
                        marginRight: 15
                    }}>Chat History</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#8E8E93' }} />
                </View>
                <List>
                    <ListItem 
                        title="View Archived Chats"
                    />
                    <ListItem 
                        title="Archive Chat History"
                    />
                    <ListItem 
                        title="Clear Chat History"
                        titleColor="red"
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
                        title="Export Data"
                    />
                    <ListItem 
                        title="Help Center"
                        titleColor="red"
                    />
                </List>
            </View>

        </ScrollView>        
    )
}

const styles = StyleSheet.create({
    container: {

    }
});