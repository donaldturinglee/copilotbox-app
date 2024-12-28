import { Dropdown } from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { colors } from "@/constants/colors"
import { setApiEndpoint, setApiKey, setModel, setModelList, setTemperature } from "@/store/modelSettingsSlice";
import { storage } from "@/utility/storage";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";

const defaultModelList = [
    {label: 'GPT-3.5', value: 'gpt-3.5-turbo'},
    {label: 'GPT-4', value: 'gpt-4'},
    {label: 'GPT-4o', value: 'gpt-4o'}
] as const;

export const OpenAISettingsScreen = (props: any) => {
    const [openModel, setOpenModel] = useState(false);
    const temperature = useSelector(state => state.modelSettings.OpenAI.temperature);
    const modelList = useSelector(state => state.modelSettings.OpenAI.modelList);
    const model = useSelector(state => state.modelSettings.OpenAI.model);
    const apiKey = useSelector(state => state.modelSettings.OpenAI.apiKey);
    const apiEndpoint = useSelector(state => state.modelSettings.OpenAI.apiEndpoint);
    const [showApiKey, setShowApiKey] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "OpenAI Settings",
            headerShadowVisible: false,
            headerLeft: () => (
                <Icon.ChevronLeftIcon 
                    onPress={() => props.navigation.goBack()}
                />
            ),
            headerTitleAlign: "center"
        })

    }, [model, modelList]);


    const handleResetDefaultModelList = useCallback(async () => {
        await storage.set("modelList", defaultModelList);
        dispatch(setModelList(defaultModelList));
    }, []);

    return (
        <View
            style={{flex: 1, backgroundColor: colors.light.background}}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>API Endpoint</Text>
                    <View style={{
                        borderBottomWidth: 1, 
                        borderColor: '#E5E5E5',
                    }}>
                        <TextInput 
                            placeholder="API Endpoint"
                            style={{
                                paddingVertical: 10
                            }}
                            value={apiEndpoint}
                            onChangeText={async (value) => { 
                                    dispatch(setApiEndpoint(value))
                                    await storage.set("apiEndpoint", value);
                                }
                            }
                        />
                    </View>
                    
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>API Key</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder="API Key"
                            secureTextEntry={!showApiKey}
                            style={styles.input}
                            value={apiKey}
                            onChangeText={async (value) => {
                                    dispatch(setApiKey(value))
                                    await storage.set("apiKey", value);
                                }
                            }
                        />
                        <View 
                            onTouchEnd={() => setShowApiKey(!showApiKey)}
                            style={styles.iconContainer}>
                            { showApiKey ? <Icon.EyeIcon /> : <Icon.EyeClosedIcon />}
                        </View>
                    </View>
                </View>
                <View style={[styles.content, { zIndex: 2000 }]}>
                    <Text style={styles.title}>Model</Text>
                    <Dropdown
                        open={openModel}
                        value={model}
                        items={modelList}
                        setOpen={setOpenModel}
                        setValue={setModel}
                        listMode="SCROLLVIEW"
                        placeholder="Select Model"
                        showResetIcon
                        setItems={async (item) => {
                            dispatch(setModelList(item))
                            await storage.set("modelList", item);
                        }}
                        onReset={handleResetDefaultModelList}
                        onChangeValue={async (value) => { 
                            dispatch(setModel(value))
                            await storage.set("model", value);
                        }}
                        searchable
                        addCustomItem
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Temperature</Text>
                    <TextInput 
                        placeholder=""
                        value={temperature}
                        onChangeText={async (value) => { 
                            dispatch(setTemperature(value))
                            await storage.set("temperature", value);
                        }}
                        style={{borderBottomWidth: 1, borderColor: 'black', paddingVertical: 10}}
                    />
                </View>
            </View>
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        position: 'relative',
        minHeight: 44,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 40,
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})