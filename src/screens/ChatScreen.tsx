import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    Image,
    Keyboard,
    Platform
} from 'react-native';
import {colors} from "@/constants/colors.ts";
import { IsAndroid, IsIOS } from '@/utility/platform';
import Icon from '@/components/Icon';
import { AddUserMessage, GetConversation, ResetConversation } from '@/utility/conversationHistory';
import { Bubble } from '@/components/Bubble';
import { openai } from '@/api/openai';
import { storage } from '@/utility/storage';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '@/components/Dropdown';
import { setModel, setModelList } from '@/store/modelSettingsSlice';

interface ChatScreenProps {}

export const ChatScreen = (props: any) => {
    const [conversation, setConversation] = useState<any>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const flatList = useRef<any>();
    const model = useSelector(state => state.modelSettings.OpenAI.model);
    const modelList = useSelector(state => state.modelSettings.OpenAI.modelList);
    const apiEndpoint = useSelector(state => state.modelSettings.OpenAI.apiEndpoint);
    const apiKey = useSelector(state => state.modelSettings.OpenAI.apiKey);
    const dispatch = useDispatch();
    const [openModel, setOpenModel] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    useEffect(() => {
        if (props.route.params?.reset) {
            handleResetConversation();
            props.navigation.setParams({ reset: undefined });
        }
    }, [props.route.params?.reset]);

    const handleSendMessage = useCallback( async () => {
        if (message === "") return "";
        AddUserMessage(message);
        setMessage("");
        setConversation([...GetConversation()]);
        await openai.TextGeneration(apiEndpoint, apiKey, model);
        setConversation([...GetConversation()]);
    }, [message]);

    const localeTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const GetTimePeriod = () => {
        const hour = parseInt(localeTime.split(':')[0]);
        const isPM = localeTime.includes('PM');

        const hour24 = isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);

        if (hour24 >= 5 && hour24 < 12) return 'morning';
        if (hour24 >= 12 && hour24 < 17) return 'afternoon';
        if (hour24 >= 17 && hour24 < 21) return 'evening';
        return 'night';
    };

    const handleResetConversation = () => {
        setConversation([]);
        ResetConversation();
    }

    const HeaderTitle = useCallback(() => {
        return (

            <View style={{flexDirection: "row",flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Dropdown
                    open={openModel}
                    value={model}
                    showArrowIcon={false}
                    headerContainerStyle={{borderWidth: 0, margin: 0, padding: 0}}
                    headerTitleStyle={{textAlign: "center"}}
                    placeholder="CopilotBox"
                    placeholderStyle={{color: colors.black}}
                    items={modelList}
                    listMode="SCROLLVIEW"
                    setOpen={(value: boolean) => {
                        setOpenModel(value);
                    }}
                    setValue={(value) => {
                        storage.set("model", value);
                        dispatch(setModel(value));
                        setOpenModel(false);
                    }}
                    setItems={(items) => {
                        storage.set("modelList", items);
                        dispatch(setModelList(items));
                    }}
                    onChangeValue={(value) => {
                        storage.set("model", value);
                        dispatch(setModel(value));
                        setOpenModel(false);
                    }}
                />
            </View>
        );
    }, [openModel, model, modelList, dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            drawerIcon: () => (
                <Icon.ChatIcon size={20} />
            ),
            headerTitle: HeaderTitle,
            headerRight: () => (
                <Icon.EditIcon style={{marginRight: 15}} onPress={handleResetConversation}/>
            ),
            headerTitleAlign: "center"
        });
    }, [HeaderTitle]);


    useEffect(() => {
        const showKeyboard = Keyboard.addListener('keyboardDidShow', (e) => {
            const offset = 81
            setKeyboardOffset(offset);
        });
        
        const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffset(0);
        });
    
        return () => {
            showKeyboard.remove();
            hideKeyboard.remove();
        };
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container}
                behavior={IsIOS() ? 'padding' : 'height'}
                keyboardVerticalOffset={IsIOS() ? 92 : keyboardOffset}
        >
                <View style={styles.content}>
                {
                    !loading && conversation.length === 0 &&
                    <View style={styles.emptyContainer}>

                        <Image
                            source={require('@/assets/images/copilot.png')}
                            style={{width: 50, height: 50, marginBottom: 20}}
                        />

                        <Text style={styles.mainTitle}>How can I help you this {
                            GetTimePeriod()
                        }?</Text>


                    </View>

                }

                {
                    conversation.length !== 0 &&
                    <FlatList
                    ref={(ref) => flatList.current = ref}
                    onLayout={() => flatList.current.scrollToEnd()}
                    onContentSizeChange={() => flatList.current.scrollToEnd()}
                    style={styles.flatList}
                    data={conversation}
                    renderItem={(data) => {
                      const item = data.item;

                      const { role, content } = item;

                      if (role === "system") return null;

                      return <Bubble
                          text={content}
                          type={role}
                        />
                    }} />

                }
                </View>

                <View style={styles.bottomBar}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                        <View style={{flex: 1}}>
                        <TextInput
                            placeholder="Chat with CopilotBox"
                            multiline
                            value={message}
                            onChangeText={(message) => setMessage(message)}
                            style={{ maxHeight: 100, width: "90%", color: colors.light.text.primary}}
                        />
                        </View>
                        <View onTouchEnd={handleSendMessage} style={{alignSelf: "flex-end", justifyContent: "center", backgroundColor: "#D97757", borderRadius: 50, width: 28, height: 28}}>
                            <Icon.SendIcon
                                color='#FFFFFF'
                                style={{
                                    alignSelf: "center",
                                    justifyContent: "center",

                                }}
                                size={20}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Icon.ToolIcon />
                    </View>
                </View>
            </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    emptyContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
        justifyContent: "center",
        alignItems: "center",
      },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    iconText: {
        fontSize: 20,
    },
    content: {
        flex: 1
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    questionButton: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    questionText: {
        fontSize: 16,
        color: '#666',
    },
    bottomBar: {
        padding: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.light.primary,
      },
    flatList: {
        marginHorizontal: 15,
        paddingVertical: 10
      },
});

