import {requests} from "../utility/requests";
import { AddAssistantMessage, GetConversation } from "@/utility/conversationHistory";

export const openai = {
    TextGeneration: async (apiEndpoint: string, apiKey: string, model: string) => {
        const url = `${apiEndpoint}/chat/completions`;
        try {
            const response = await requests.post(url, 
                {
                    model: model,
                    messages: GetConversation()
                }, 
                {
                    headers: {"Authorization": `Bearer ${apiKey}`}
                }
            );
            
            if (response?.choices?.[0]?.message?.content) {
                let message = response.choices[0].message.content;
                message = message.replace(/(\r\n|\n|\r)/gm, "");
                AddAssistantMessage(message);
            } else {
                AddAssistantMessage("Error: Invalid response format from API");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error?.message || "An unknown error occurred";
            AddAssistantMessage("Error: " + errorMessage);
        }
    },
}