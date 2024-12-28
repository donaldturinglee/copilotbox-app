import { MainNavigator } from "@/navigations/MainNavigator";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { storage } from "@/utility/storage";
import { setApiEndpoint, setApiKey, setBrand, setModel, setTemperature } from "@/store/modelSettingsSlice";
export const StartUpScreen = () => {
    const [initialised, setInitialised] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const GetSettings = async () => {
            try {
                const brand = await storage.get("brand");
                brand && dispatch(setBrand(brand));
                if (brand === "openai") {
                    const model = await storage.get("model");
                    const temperature = await storage.get("temperature");
                    const apiKey = await storage.get("apiKey");
                    const apiEndpoint = await storage.get("apiEndpoint");
                    dispatch(setModel(model));
                    dispatch(setTemperature(temperature));
                    dispatch(setApiKey(apiKey));
                    dispatch(setApiEndpoint(apiEndpoint));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setInitialised(true);
            }
        }
        GetSettings();
    }, []);

    if (!initialised) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <MainNavigator />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
