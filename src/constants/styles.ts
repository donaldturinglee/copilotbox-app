import {StyleSheet} from "react-native";
import {colors} from "@/constants/colors.ts";

export const defaultStyles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    screenContainer: {
        flex: 1,
    },
});
