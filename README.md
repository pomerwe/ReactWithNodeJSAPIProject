# 📈 Stock Price Query System

This project is a full-stack application developed for a technical interview.  
It features a **Node.js** backend and a **React** frontend that queries stock prices from [IEX Cloud](https://cloud.iexapis.com).

## 🎯 Project Purpose

- Provide real-time or near-real-time stock price data from IEX Cloud  
- Demonstrate full-stack development skills using Node.js and React  
- Showcase integration with external APIs and proper error handling  
- Developed for interview purposes with production-level considerations

## ⚙️ Technologies Used

### Backend
- Node.js  
- Express.js  
- Axios (for API calls to IEX Cloud)  
- Environment variables for secure API key management

### Frontend
- React  
- Axios or Fetch API for HTTP requests  
- React Hooks for state management  
- CSS Modules or styled-components for styling (optional)

## 🗂 Project Structure

### Backend
- `server.js` — Initializes the server and sets up routes  
- `routes/` — Contains route handlers for stock queries  
- `controllers/` — Business logic for fetching data from IEX Cloud  
- `utils/` — Helper functions and API call wrappers

### Frontend
- `src/` — Main source code folder  
  - `components/` — Reusable UI components (e.g., StockQuote, SearchForm)  
  - `pages/` — Main pages such as Home and Results  
  - `App.js` — Main application component  
  - `services/` — Functions to call the backend API  
- `public/` — Static assets and the HTML template

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed on your machine  
- An API key from [IEX Cloud](https://cloud.iexapis.com)

### Setup

#### Backend
1. Navigate to the backend folder (if separated).  
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables (e.g., create a `.env` file) including your IEX Cloud API key.  
4. Start the Node.js server:
   ```bash
   npm start
   ```

#### Frontend
1. Navigate to the frontend folder (if separated).  
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## 📌 Notes

- Both backend and frontend implement error handling and loading states for a seamless user experience.  
- The project demonstrates integration with external APIs and full-stack development practices.  
- Designed for further extension into a more comprehensive stock analysis application.

---

Made with ❤️ using Node.js and React — bridging stock data with modern web development.
