# DnD Character Creator Frontend

Frontend React application for creating and viewing Dungeons & Dragons characters.  
This app fetches data from the **DnD 5e API** (`https://www.dnd5eapi.co/api`) and connects to a custom backend ([dnd-backend](https://github.com/mattos-rafael/dnd-backend)) for storing and managing created characters.

---

## Features

- Create a **level 1 D&D character**  
- View the character sheet  
- Fetches races, classes, and other character options from the **DnD 5e API**  
- Connects to the custom backend to store and retrieve characters  

---

## Tech Stack

- **React.js** (Frontend framework)  
- **Axios** (HTTP requests)  
- **CSS
- **Node.js / Express backend** ([dnd-backend](https://github.com/mattos-rafael/dnd-backend))  

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mattos-rafael/dnd-frontend
cd dnd-front
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run by default at `http://localhost:5173`.

---

## Configuration

Make sure your backend server ([dnd-backend](https://github.com/mattos-rafael/dnd-backend)) is running locally or deployed.  
Update the environment variables if needed:

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

- `VITE_API_URL`: URL of your backend API  

> Note: Environment variables must start with `REACT_APP_` to be accessible in React.

---

## Functionality Overview

### 1. Create Character

- Users can create a **level 1 character** by filling out a simple form.  
- The form fetches options like races, classes, and stats from the **DnD 5e API**.  
- After submission, the character is saved in the backend database.

### 2. View Character Sheet

- Users can view their created character sheet.  
- Displays all basic character info: name, race, class, level, and stats.

---

## Example Usage

1. Start the backend ([dnd-backend](https://github.com/mattos-rafael/dnd-backend))  
2. Start the frontend with `npm start`  
3. Open the app in your browser: `http://localhost:5173`  
4. Fill in the character creation form  
5. Submit to save the character  
6. View your character sheet  

---

## Project Structure

```bash
dnd-frontend/
│
├── src/
│   ├── components/       # React components (CharacterForm, CharacterSheet, etc.)
│   ├── services/         # API service functions
│   ├── App.jsx
│   └── index.jsx
├── public/
├── package.json
└── .env
```

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by Rafael Mattos.