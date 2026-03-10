# ScamGuard AI

ScamGuard AI is a full-stack web application that helps detect suspicious recruiter messages and job scams using artificial intelligence.

Users can paste messages, emails, or recruiter communications and receive an AI-generated scam risk analysis with explanations.

## Features

- AI-powered scam detection
- Risk score classification
- Explainable scam indicators
- Secure authentication with JWT
- Scan history dashboard
- Example message testing

## Tech Stack

Frontend

- React
- React Router
- Vite

Backend

- Node.js
- Express

Database

- MongoDB

AI Integration

- OpenAI API

## How It Works

1. User logs into the application
2. User pastes a suspicious message
3. Backend sends text to AI model
4. AI returns verdict, risk score, and reasons
5. Result is stored in database
6. User can view previous scans in History page

## Example Output

Verdict: SCAM  
Risk Score: 95

Reasons:

- Requests payment for equipment upfront
- Immediate hiring without interview
- Unusual payment method for job expenses

## Future Improvements

- Highlight suspicious phrases
- Browser extension for scam detection
- Email integration for automatic analysis

## Author

Akshay Raavi
