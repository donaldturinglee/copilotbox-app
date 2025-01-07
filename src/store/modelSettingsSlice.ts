import { createSlice } from '@reduxjs/toolkit';


const defaultValues = {
    brand: "",
    OpenAI: {
        apiKey: "",
        apiEndpoint: "",
        model: "",
        modelList: [
            {label: 'GPT-3.5', value: 'gpt-3.5-turbo'},
            {label: 'GPT-4', value: 'gpt-4'},
            {label: 'GPT-4o', value: 'gpt-4o'}
        ],
        temperature: "1",
    }
}

const modelSettingsSlice = createSlice({
    name: 'modelSettings',
    initialState: defaultValues,
    reducers: {
        setBrand: (state, action) => {
            state.brand = action.payload
        },
        setTemperature: (state, action) => {
            state.OpenAI.temperature = action.payload;
        },
        setModel: (state, action) => {
            state.OpenAI.model = action.payload;
        },
        setModelList: (state, action) => {
            state.OpenAI.modelList = action.payload;
        },
        setApiKey: (state, action) => {
            state.OpenAI.apiKey = action.payload;
        },
        setApiEndpoint: (state, action) => {
            state.OpenAI.apiEndpoint = action.payload;
        },
        resetAllSettings: () => defaultValues,

        
    }
});

export const { resetAllSettings, setTemperature, setModelList, setModel, setBrand, setApiEndpoint, setApiKey } = modelSettingsSlice.actions;
export default modelSettingsSlice.reducer;