import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const botName = "RasaBot";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. How can I help you today?`)],
  customComponents: {},
  customStyles: {
    botMessageBox: { backgroundColor: "#376B7E" },
    chatButton: { backgroundColor: "#5ccc9d" },
  },
  state: {},
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
