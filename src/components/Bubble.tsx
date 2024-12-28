import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";
import { colors } from "@/constants/colors";
import { TypingAnimation } from "@/animations/TypingAnimation";

interface BubbleProps {
    text: string;
    type: "user" | "assistant";
}

export const Bubble = ({ text, type }: BubbleProps) => {
    const isAssistant = type === "assistant";

    return (
        <View style={[
            styles.container,
            isAssistant ? styles.assistantContainer : styles.userContainer
        ]}>
            {isAssistant && (
                <View style={styles.iconContainer}>
                    <Icon.CopilotIcon />
                </View>
            )}
            
            <View style={[
                styles.messageContainer,
                isAssistant ? styles.assistantMessage : styles.userMessage
            ]}>
                {
                    isAssistant ? (
                        <TypingAnimation typeSpeed={10} style={styles.text} content={text} />
                    ) : (
                        <Text style={styles.text}>{text}</Text>
                    )
                }
                
            </View>

            {!isAssistant && (
                <View style={styles.iconContainer}>
                    <Image source={require("@/assets/images/avatar.jpg")} style={{width: 24, height: 24, borderRadius: 50}}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    assistantContainer: {
        justifyContent: "flex-start",
    },
    userContainer: {
        justifyContent: "flex-end",
    },
    iconContainer: {
        paddingTop: 10,
        height: 24,
        justifyContent: "flex-start",
    },
    messageContainer: {
        flexShrink: 1,
        borderRadius: 5,
        padding: 12,
        marginHorizontal: 8,
    },
    assistantMessage: {
        backgroundColor: colors.light.surface,
    },
    userMessage: {
        backgroundColor: colors.light.surface,
    },
    text: {
        color: "black",
        fontFamily: "regular",
        lineHeight: 20,
    },
});