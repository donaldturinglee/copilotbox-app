import { configureStore } from "@reduxjs/toolkit";
import modelSettingSlice from "./modelSettingsSlice";

export const store = configureStore({
    reducer: {
        modelSettings: modelSettingSlice,
    }
})