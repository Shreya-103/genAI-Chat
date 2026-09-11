# GenAI Chat

A card-based AI question and answer application built with React and Node.js. Users can ask questions, receive AI-generated answers through the Gemini API, and store their question history locally in the browser.

The project uses a card-deck interface instead of a traditional chat layout, making the application feel more like a personal question archive.

## Live Demo

Use it from here: [htt](https://genai-103.g)ps://genai-ask.netlify.app

## Features

* Ask questions and receive AI-generated answers
* Card-based question and answer interface
* Question history stored using browser localStorage
* Navigate between previous and next question cards
* Light and dark mode
* Theme preference saved in localStorage
* Loading state while generating answers
* Separate error handling components
* Responsive interface
* Backend API built with Express
* Gemini API integration
* No login or authentication required

## Tech Stack

### Frontend

* React
* Vite
* Axios
* React Markdown
* CSS
* localStorage

### Backend

* Node.js
* Express.js
* Axios
* Google Gemini API
* CORS
* dotenv

### Deployment

* Netlify for the frontend
* Render for the backend

## Project Structure

```text
genai-chat/
│
├── backend/
│   ├── src/
│   │   └── App.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AIErrorHandler.jsx
    │   │   └── ErrorCard.jsx
    │   │
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
```

## How It Works

The application follows a simple request flow:

```text
User enters a question
        |
        v
React Frontend
        |
        v
POST /api/ai
        |
        v
Express Backend
        |
        v
Gemini API
        |
        v
AI-generated answer
        |
        v
React Card
        |
        v
localStorage
```

When a user asks a question, the frontend sends it to the Express backend. The backend sends the question to the Gemini API and returns the generated answer.

The frontend then creates a new card containing:

* Question
* AI answer
* Date

The card is stored in `localStorage`, so the question history remains available when the user refreshes the page.

## Local Storage

Since the data is stored locally:

* Cards are available only on the same browser and device
* Clearing browser storage removes the saved cards
* Cards are not synchronized between devices
* Different users do not share the same card history

## Error Handling

AI errors are handled using separate components instead of putting all error logic inside `App.jsx`.

```text
AIErrorHandler
       |
       v
    ErrorCard
```

`AIErrorHandler.jsx` determines the type of error and passes the appropriate information to `ErrorCard.jsx`.

The application can display different messages for situations such as:

* Network errors
* Rate limiting
* Server unavailable
* Invalid requests
* Unknown errors

This keeps `App.jsx` focused on application logic while the error UI remains reusable and easier to maintain.

## Environment Variables

Create a `.env` file inside the backend folder:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Do not commit your `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd genai-chat
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will start the frontend.

### Backend

Open another terminal:

```bash
cd backend
npm install
node server.js
```

The Express server will start on the configured port.

## Design

The application intentionally avoids the traditional AI chatbot layout.

Instead of displaying a conversation with multiple chat bubbles, each question and answer is treated as an individual card.

The card interface allows users to:

* View the current question
* Read the generated answer
* Move through previous questions
* Keep a visual archive of their questions
* Switch between light and dark themes

## Future Improvements

Possible improvements for future versions include:

* User authentication
* Cloud-based question history
* Database storage
* Search through saved questions
* Delete individual cards
* Edit questions
* Export question history
* Multiple AI model selection
* Improved error recovery
* Streaming AI responses

## Purpose

This project was built to practice and demonstrate:

* React state management
* React hooks
* API integration
* Express backend development
* Gemini API integration
* Axios requests
* Error handling
* localStorage
* Markdown rendering
* Responsive UI design
* Frontend and backend deployment
* Separating application logic into reusable components
