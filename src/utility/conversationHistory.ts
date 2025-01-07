let conversation: any = [];

export const GetConversation = () => {
    return conversation;
};

export const InitConversation = () => {

    let prompt = "You are a virtual assistant named CopilotBox. ";

    AddSystemMessage(prompt);
};

export const AddUserMessage = (message: string) => {
    conversation.push({
        role: "user",
        content: message,
    });
};

export const AddAssistantMessage = (message: string) => {
    conversation.push({
        role: "assistant",
        content: message,
    });
};

export const AddSystemMessage = (message: string) => {
    conversation.push({
        role: "system",
        content: message,
    });
};

export const ResetConversation = () => {
    conversation = [];
    InitConversation();
};
