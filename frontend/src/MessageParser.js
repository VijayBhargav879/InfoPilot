class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const trimmedMessage = message.trim();
      if (trimmedMessage) {
        this.actionProvider.handleUserMessage(trimmedMessage);
      }
    }
  }
  
  export default MessageParser;
  