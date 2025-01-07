import {Platform} from "react-native";

export const IsIOS = () => {
    return Platform.OS === "ios";
};

export const IsAndroid = () => {
    return Platform.OS === "android";
};
