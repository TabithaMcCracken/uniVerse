
# Bible Verse Memorization Website

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-blue)](https://universe-frontend-lh9l.onrender.com)

## Description
This project is a full-stack website designed to help kids practice memorizing Bible verses. Users can create accounts, log in, add verses, and play an interactive game to aid in memorization.

## Screenshot
![App Screenshot](./images/Home_Page_Screenshot.png)

## Features
- User registration and authentication
- Bible verse selection
- An Interactive verse memorization game
- User-specific verse management

## Technologies Used

## Planning
- Jira kanband board
- Figma wireframes

### Frontend
- React
- React Router
- CSS (custom styles)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv (for environment variables)
- cors (for Cross-Origin Resource Sharing)
- Crossway ESV Bible API (for fetching Bible verses)

## Getting Started
### Prerequisites
- Node.js installed
- MongoDB instance (local or cloud-based)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/TabithaMcCracken/uniVerse
    cd uniVerse
    ```

2. Install the dependencies for the backend:
    ```sh
    cd backend
    npm install
    ```

3. Install the dependencies for the frontend:
    ```sh
    cd ../frontend
    npm install
    ```

### Environment Variables
Create a `.env` file in the `backend` directory with the following content:
    ```env
    PORT=3075
    ATLAS_URI=your_mongodb_connection_string
    ```

### Running the Application
1. Start the backend development server:
    ```sh
    cd backend
    nodemon run dev
    ```

2. Start the frontend development server:
    ```sh
    cd ../frontend
    npm run dev
    ```

3. The frontend should now be running on `http://localhost:5173` and the backend on `http://localhost:3075`.

## Project Structure
### Backend
- `index.js`: Entry point for the backend server
- `config/db.js`: Database connection setup
- `routes/userRoutes.js`: Routes for user-related operations
- `controllers/usersController.js`: User-related controller functions
- `controllers/verseController.js`: Verse-related controller functions
- `models/usersModel.js`: Mongoose schema for user data

### Frontend
- `src/App.jsx`: Main React component
- `src/index.jsx`: Entry point for the frontend
- `src/pages`: Directory containing the React components for each page (Home, Login, CreateAccount, etc.)
- `src/components`: Directory containing reusable React components (Navbar, VerseCard, etc.)
- `src/assets`: Directory for static assets like CSS files and images
- `src/context/AuthContext.jsx`: Context for handling authentication state

## License
This project is licensed under the MIT License.
