
# 🌍 Multiplayer Unicode Grid

A real-time multiplayer web application where all players share and interact on the **same 10×10 Unicode grid**.  
Each player can select one block and place a Unicode character, which updates instantly for every other player online.  
Once a character is placed, that player cannot modify any other block again (or must wait for the cooldown timer, if enabled).

---

## 🚀 Features

- 🧩 **Shared Grid State** — All players see the same live 10×10 grid.
- ⚡ **Real-Time Updates** — Instantly synced changes using Socket.IO.
- 🙋‍♂️ **Online Player Count** — View how many users are currently connected.
- 🔒 **Single Move Restriction** — Players can make only one move (or after a cooldown period).
- 🕓 **History Tracking** — Shows a timeline of all grid updates with timestamps.
- ⏱️ **Optional Cooldown Timer** — 1-minute restriction before a player can act again.
- 📜 **Unified History View** — Displays past updates for transparency.
- 💻 **Responsive UI** — Works smoothly across devices and screen sizes.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Socket.IO Client |
| **Backend** | Node.js + Express + Socket.IO |
| **Database** | MongoDB |
| **Language** | TypeScript |
| **Real-Time Engine** | WebSockets (via Socket.IO) |

---

## 📁 Project Structure

Perfect — here’s your **final and corrected full folder structure** for your multiplayer Unicode grid project:

---

### 📂 **Project Root**

```
webgame
│
├── /client                     # Frontend (React + Socket.IO client)
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── /node_modules
│   └── /src
│       ├── App.tsx
│       ├── App.css
│       ├── index.css
│       ├── main.tsx
│       │
│       ├── /components
│       │   ├── Block.tsx
│       │   ├── GridBoard.tsx
│       │   ├── History.tsx
│       │   └── OnlineUsers.tsx
│       │
│       └── /utils
│           ├── api.ts
│           └── socket.ts
│
└── /server                     # Backend (Node.js + Express + Socket.IO + MongoDB)
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── /node_modules
    └── /src
        ├── server.ts
        ├── socket.ts
        │
        ├── /models
        │   ├── grid.model.ts
        │   └── history.model.ts
        │
        └── /utils
            └── gridUtils.ts
```

---

#### 🖥️ **Client (Frontend)**

* `main.tsx` -> Entry point rendering `<App />`
* `App.tsx` -> Root layout managing routing and socket connection
* `components/` -> UI parts for grid, blocks, users, and history
* `utils/socket.ts` -> Socket.IO client connection
* `utils/api.ts` -> Handles REST API requests (optional)
* `.env` -> Holds `VITE_BACKEND_URL`

#### ⚙️ **Server (Backend)**

* `server.ts` -> Express + Socket.IO main entry
* `socket.ts` -> Socket event logic (real-time updates, online count, etc.)
* `models/grid.model.ts` -> Mongo schema for grid
* `models/history.model.ts` -> Mongo schema for move history
* `utils/gridUtils.ts` -> Helper functions for grid manipulation
* `.env` -> Contains `PORT`, `MONGO_URI`, etc.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rafiq097/webgame
cd webgame
````

### 2️⃣ Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Start the backend server

```bash
npm run dev
```

### 4️⃣ Start the frontend

```bash
npm run dev
```

Then open your browser at **[http://localhost:5173](http://localhost:5173)**

---

## 🧩 How It Works

1. When a user connects, the backend adds them to the **online players list**.
2. The frontend receives real-time updates of:

   * Grid state
   * Player count
   * Update history
3. When a player selects a block and places a Unicode character:

   * The backend updates MongoDB with the new character.
   * Socket.IO broadcasts this update to all connected clients.
4. That player is restricted from updating again unless the cooldown period (if enabled) passes.
5. Other players instantly see the updated grid and history logs.

---

## 🌐 Environment Variables

### Backend (`.env`)

```
PORT=5000
MONGO_URI= your_mongo_uri || mongodb://localhost:27017/unicode-grid
```

### Frontend (`.env`)

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 🗃️ Database Structure (MongoDB)

**Collection: grids**

```json
{
  "size": 10,
  "cells": [
    { "row": 0, "col": 0, "char": "A", "updatedAt": "2025-10-25T10:00:00Z" },
    ...
  ],
  "history": [
    { "row": 0, "col": 0, "char": "A", "playerId": "abc123", "updatedAt": "2025-10-25T10:00:00Z" }
  ]
}
```

---

## 🔄 Real-Time Events

| Event          | Direction            | Description                       |
| -------------- | -------------------- | --------------------------------- |
| `connect`      | Client → Server      | Player joins grid                 |
| `initial-grid` | Server → Client      | Sends full grid state             |
| `place-char`   | Client → Server      | Player places a Unicode character |
| `cell-updated` | Server → All Clients | Broadcasts a block update         |
| `online-count` | Server → All Clients | Sends updated online user count   |
| `history`      | Server → Client      | Sends past grid updates           |

---

## 🧠 Additional Features

* **Cooldown Timer** — prevent spamming; configurable delay before next move.
* **Historical Replay** — review previous states of the grid.
* **Grouped Updates** — combine multiple quick updates made within the same second.

---
