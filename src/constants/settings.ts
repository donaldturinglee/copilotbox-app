export const authNavigation = {
    SIGNIN: "Signin",
    SIGNUP: "Signup",
} as const;

export const mainNavigation = {
    CHAT: "Chat",
    DRAWER: "Drawer",
    SETTINGS: "Settings",
    EXPLORE: "Explore",
    ABOUT: "About",
    AUTH: "Auth",
    MODEL: "Model",
    OPENAI_SETTINGS: "OpenAISettings",
    DATA_CONTROLS: "DataControls",
} as const;

export const modelSettings = {
    OpenAI: {
        API_KEY: "API Key",
        API_ENDPOINT: "API Endpoint",
        MODEL: "Model",
        MODEL_LIST: [],
        TEMPERATURE: "Temperature",
    }
}

export const defaultModelList = {
    OpenAI: [
        {label: 'GPT-3.5', value: 'gpt-3.5-turbo'},
        {label: 'GPT-4', value: 'gpt-4'},
        {label: 'GPT-4o', value: 'gpt-4o'}
    ]
}