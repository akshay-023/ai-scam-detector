# 🛡 ScamGuard AI

ScamGuard AI is a full-stack web application that helps detect recruiter scams, phishing attempts, and suspicious job messages using artificial intelligence.

Users can paste recruiter messages, emails, or suspicious texts and instantly receive an AI-powered risk analysis that classifies the message as **SAFE, SUSPICIOUS, or SCAM**, along with a risk score and explanations.

This project demonstrates AI integration, full-stack development, authentication, and real-world problem solving.

---

# 🚀 Live Demo

Frontend (Vercel)

https://ai-scam-detector-tau.vercel.app

Backend API (Render)

https://ai-scam-detectorr.onrender.com

⚠️ Note: The backend may take **20–30 seconds to wake up** due to free hosting on Render.

---

# ✨ Features

## 🤖 AI-Powered Scam Detection

Uses AI to analyze messages and detect scam patterns such as:

- Upfront payment requests
- Urgency tactics
- Suspicious recruiter behavior
- Missing company verification

## 📊 Risk Scoring System

Each message receives a **risk score (0–100)** indicating the likelihood of fraud.

## 🔍 Explainable AI Output

The system provides clear explanations highlighting suspicious patterns detected in the message.

## 🔐 Authentication System

- User registration
- Secure login
- JWT-based authentication
- Protected routes

## 📜 Scan History Dashboard

Users can view previous scans including:

- verdict
- risk score
- explanation
- timestamp

## 🧪 Example Message Testing

Built-in examples allow users to test the system with:

- scam message
- suspicious message
- safe recruiter message

---

# 🧰 Tech Stack

## Frontend

- React
- React Router
- Vite

## Backend

- Node.js
- Express

## Database

- MongoDB Atlas

## AI Integration

- OpenAI API

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 🏗 System Architecture

Frontend (React)  
↓  
Backend API (Node.js / Express)  
↓  
OpenAI API (AI Analysis)  
↓  
MongoDB Atlas (Stores scan history)

---

# 📌 Example Output

Verdict: SCAM  
Risk Score: 95

Reasons:

- Requests payment for equipment upfront
- Immediate hiring without interview
- Suspicious payment method for job expenses
- Missing company verification

---

# 🔮 Future Improvements

- Highlight suspicious phrases detected by AI
- Browser extension for scam detection
- Automatic email scanning
- Recruiter domain verification
- Scam reporting database

---

# 👨‍💻 Author

Akshay Raavi

MS Computer Science — Oklahoma City University

Full Stack Developer

---

# 📜 License

This project is licensed under the MIT License.
