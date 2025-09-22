import axios from "axios";
import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
    try {
      const response = await axios.post("http://localhost:5005/webhooks/rest/webhook", {

        sender: "user",
        message: message,
      });

      response.data.forEach((msg) => {
        if (msg.text) {
          const botMessage = this.createChatBotMessage(msg.text);
          this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
        }
      });
    } catch (error) {
      const errMessage = this.createChatBotMessage("Sorry, I couldn't reach the server.");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errMessage],
      }));
    }
  };
}

export default ActionProvider;
