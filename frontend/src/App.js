import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Plus, Globe, Megaphone, AppWindow, Mic, Send, Book } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/webhooks/rest/webhook";

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const generateId = () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === activeConversationId) || { messages: [] };
  };

  useEffect(() => {
    localStorage.setItem('chatbot_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    const savedConversations = localStorage.getItem('chatbot_conversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      if (parsed.length === 0 || !parsed[0].messages || parsed[0].messages.length === 0) {
        const defaultConversation = {
          id: generateId(),
          title: "New Chat",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setConversations([defaultConversation]);
        setActiveConversationId(defaultConversation.id);
        localStorage.setItem('chatbot_conversations', JSON.stringify([defaultConversation]));
      } else {
        setConversations(parsed);
        setActiveConversationId(parsed[0].id);
      }
    } else {
      createNewConversation();
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeConversationId, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const createNewConversation = () => {
    const newId = generateId();
    const newConversation = {
      id: newId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newId);
  };

  const updateConversationTitle = (conversationId, firstMessage) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId && conv.title === "New Chat") {
        return {
          ...conv,
          title: firstMessage.length > 50
            ? firstMessage.substring(0, 50) + "..."
            : firstMessage,
          updatedAt: new Date()
        };
      }
      return conv;
    }));
  };

  const deleteConversation = (conversationId, e) => {
    e.stopPropagation();
    if (conversations.length === 1) {
      createNewConversation();
    } else {
      setConversations(prev => {
        const filtered = prev.filter(conv => conv.id !== conversationId);
        if (activeConversationId === conversationId && filtered.length > 0) {
          setActiveConversationId(filtered[0].id);
        }
        return filtered;
      });
    }
  };

  const switchToConversation = (conversationId) => {
    setActiveConversationId(conversationId);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = {
      sender: "user",
      text: input.trim(),
      timestamp: new Date(),
    };
    const currentConv = getCurrentConversation();
    const updatedMessages = [...currentConv.messages, userMessage];
    setConversations(prev => prev.map(conv =>
      conv.id === activeConversationId
        ? { ...conv, messages: updatedMessages, updatedAt: new Date() }
        : conv
    ));
    if (currentConv.title === "New Chat") {
      updateConversationTitle(activeConversationId, userMessage.text);
    }
    setInput("");
    setIsTyping(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "user", message: userMessage.text }),
      });
      const data = await res.json();
      const botReplies = data.map(d => ({
        sender: "bot",
        text: d.text,
        timestamp: new Date(),
      }));
      setTimeout(() => {
        setConversations(prev => prev.map(conv =>
          conv.id === activeConversationId
            ? {
              ...conv,
              messages: [...updatedMessages, ...botReplies],
              updatedAt: new Date()
            }
            : conv
        ));
        setIsTyping(false);
      }, 1200);
    } catch (err) {
      setTimeout(() => {
        const errorMessage = {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        };
        setConversations(prev => prev.map(conv =>
          conv.id === activeConversationId
            ? {
              ...conv,
              messages: [...updatedMessages, errorMessage],
              updatedAt: new Date()
            }
            : conv
        ));
        setIsTyping(false);
      }, 1200);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentConversation = getCurrentConversation();

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">InfoPilot</span>
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>
        </div>

        <div className="sidebar-content">
          <div className="search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input type="text" placeholder="Search" />
          </div>

          <div className="nav-section">
            <div className="nav-item active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>InfoPilot</span>
            </div>
            <div className="nav-item" onClick={() => window.open("https://www.notion.so/InfoPilot-Documentation-260b8dff9982803cb237f265d1417b6d?source=copy_link", "_blank")}>
              <Book size={16} />
              <span>Docs</span>
            </div>
          </div>

          <button className="new-chat-btn" onClick={createNewConversation}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <span>New Chat</span>
          </button>

          <div className="conversation-history">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${activeConversationId === conv.id ? 'active' : ''}`}
                onClick={() => switchToConversation(conv.id)}
              >
                <span>{conv.title}</span>
                <button
                  className="delete-conversation-btn"
                  onClick={(e) => deleteConversation(conv.id, e)}
                  title="Delete conversation"
                  aria-label="Delete conversation"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <a
            href="https://github.com/VijayBhargav879"
            target="_blank"
            rel="noopener noreferrer"
            className="user-profile"
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label="View GitHub profile"
          >
            <div className="user-avatar">V</div>
            <span>VJ</span>
          </a>
        </div>

      </aside>

      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="chat-area">
          <div className="messages-container">
            {(!currentConversation.messages || currentConversation.messages.length === 0) && (
              <div className="chat-title-section">
                <h1 className="chat-title">InfoPilot</h1>
                <p className="chat-subtitle">
                  Your AI assistant powered by advanced language understanding.
                  Ask me anything and I'll help you find the information you need.
                </p>
              </div>
            )}
            {currentConversation.messages && currentConversation.messages.length > 0 &&
              currentConversation.messages.map((msg, idx) => (
                <div key={idx} className={`message-group ${msg.sender}`}>
                  <div className="message-content">
                    <div className="message-text">{msg.text}</div>
                  </div>
                </div>
              ))}

            {isTyping && (
              <div className="message-group bot">
                <div className="typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="input-area">
          <div className="input-container">
            <div className="input-wrapper">
              <div className="input-icons">
                {/* Theme toggle icon replacing leftmost globe icon */}
                <button
                  className="input-icon-btn"
                  title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {darkMode ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79" />
                    </svg>
                  )}

                </button>
                <button className="input-icon-btn" title="Language">
                  <Globe size={20} />
                </button>
                <button className="input-icon-btn" title="Announcements">
                  <Megaphone size={20} />
                </button>
                <button className="input-icon-btn" title="Apps">
                  <AppWindow size={20} />
                </button>
              </div>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask anything"
                className="message-input"
                rows="1"
              />
              <div className="input-right-icons">
                <button className="input-icon-btn" title="Voice Input">
                  <Mic size={20} />
                </button>
                <button
                  className="send-btn"
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  title="Send Message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
