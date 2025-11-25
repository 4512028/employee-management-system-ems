# 🧑‍💼 Employee Management System (Full Stack)

This repository contains a full-stack application for managing employee data, featuring a NestJS Backend and a Next.js Frontend.

## 🚀 Overview

The system provides a modern user interface to interact with a robust, RESTful API.

### Components & Ports

| Component | Framework | Port | Details |
| :--- | :--- | :--- | :--- |
| **Backend (API)** | NestJS | `3000` | Handles business logic and data persistence. |
| **Frontend (UI)** | Next.js | `3000` | User interface, consumes the API. |
| **Database** | MySQL | `3307` | Dockerized data storage (`employee_db`). |

---

## 🛠️ Full Stack Setup & Run Instructions

Follow these steps **sequentially** to get the entire application running locally.

### 1. ⚙️ Start the Database (MySQL)

1.  Navigate to the **`backend`** directory:
    ```bash
    cd backend
    ```
2.  Start the MySQL container:
    ```bash
    docker-compose up -d
    ```

### 2. 🔌 Run the Backend Service (API)

The API server will run on `http://localhost:3000`.

1.  Still in the **`backend`** directory, install dependencies:
    ```bash
    npm install
    ```
2.  Start the backend:
    ```bash
    npm run start:dev
    ```
    *(Keep this terminal window open.)*

### 3. 🌐 Run the Frontend Application (UI)

Open a **new terminal window** for the frontend.

1.  Navigate to the **`frontend`** directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend server:
    ```bash
    npm run dev
    ```

### 4. ✅ Access the Application

1.  Open your web browser and navigate to: **`http://localhost:3000`**
2.  Log in using the default credentials:
    * **Email:** `admin@example.com`
    * **Password:** `admin123`

---

## 🛑 How to Stop the Application

1.  Stop the Frontend and Backend servers ($\text{Ctrl + C}$ in their respective terminals).
2.  Navigate to the `backend` directory and stop the database container:
    ```bash
    cd backend
    docker-compose down
    ```