
```markdown
# InfoPilot 🤖✨

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Languages](https://img.shields.io/badge/languages-JavaScript%2CPython-blueviolet?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/VijayBhargav879/InfoPilot?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/VijayBhargav879/InfoPilot?style=for-the-badge)

---
<div align="center">
  <a href="#demo">🎥 Demo</a> •
  <a href="#features">🚀 Features</a> •
  <a href="#architecture">🏗️ Architecture</a> •
  <a href="#multi-language-support">🌍 Multi-language Support</a> •
  <a href="#getting-started">🛠️ Getting Started</a> •
  <a href="#faq">❓ FAQ</a> •
  <a href="#contact">📬 Contact</a>
</div>

---

## Overview

**InfoPilot** is an AI-powered multilingual chatbot that delivers seamless, intelligent user interaction and knowledge retrieval. Its modern React frontend synced with Rasa Pro backend and OpenAI API ensures dynamic, contextual conversations in multiple languages.

---

## 🎥 Demo

<div align="center">
  <img src="./docs/demo.gif" alt="InfoPilot Demo" width="600" />
  <p><i>A sneak peek at the dynamic chat experience with language switching and theme toggling.</i></p>
</div>

---

## 🚀 Features

- ✅ Multi-Chat Sidebar  
- ✅ Light/Dark Mode Toggle  
- ✅ Persistent Chat History  
- ✅ Multi-language Chat Support (English, Hindi, etc.)  
- ✅ Responsive Design (Mobile & Desktop)  
- ✅ Integrated Docs & Quick Actions  

---

## 🏗️ Architecture Overview

```
graph LR
  A[React Frontend] --> B[Bot/App Server]
  B --> C[Rasa Pro Server]
  C --> D[OpenAI API]
```

- The React frontend connects via an app server middleware to Rasa Pro backend.
- Rasa Pro runs advanced NLP and communicates with OpenAI API for generating responses.
- Designed for extensibility with modular backend actions.

---

## 🌍 Multi-language Support

- Frontend sends and receives messages in various supported languages.
- Rasa Pro performs auto language detection and processing.
- Users can switch seamlessly without losing chat context.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+)  
- Python 3.8+  
- Rasa Pro License & Setup  
- OpenAI API Key

### Installation

```
git clone https://github.com/VijayBhargav879/InfoPilot.git
cd InfoPilot
cd frontend
npm install
```

- Configure your Rasa Pro backend and insert your OpenAI API key in the appropriate config.
- Run frontend:

```
npm start
```

- Run backend with:

```
rasa run
```

- Access frontend at `http://localhost:3000`

---

## ❓ FAQ

<details>
<summary><b>How do I add new languages?</b></summary>
Update the language pipeline config in Rasa Pro backend. Frontend adapts automatically.
</details>

<details>
<summary><b>Can I use other LLMs instead of OpenAI?</b></summary>
Yes, customize backend integrations for any API-compatible language model.
</details>

<details>
<summary><b>Is InfoPilot production-ready?</b></summary>
No, the project is in early development and actively evolving.
</details>

---

## 📬 Contact

For questions, support, or collaboration, reach out:  
**vijaybhargav879@gmail.com**

---

<div align="center">
  Made with ❤️ & AI by Vijay Bhargav © 2025
</div>
```


Sources
