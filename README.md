# Eat Easy

Eat Easy is a modern web application built with **React (Vite)** and **TypeScript** that helps users discover and recommend dishes and nearby locations. It features a robust authentication system using **Supabase** and a custom **Express.js** backend for handling secure OTP verification via **Resend**.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- **Personalized Recommendations**: Discover dishes based on preferences.
- **Secure Authentication**: Custom 4-digit OTP email verification flow using Resend and Supabase Admin API.
- **Responsive Design**: Optimized for both desktop and mobile experiences.
- **Theme Support**: seamless Dark/Light mode toggling.
- **Smooth Animations**: Integrated `framer-motion` for engaging UI interactions.
- **Location Services**: Interactive components for finding nearby places.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Environment Setup

Create a `.env` file in the root directory of the project. You will need credentials from **Supabase** and **Resend**.

```env
# Supabase Configuration (Client-side)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Configuration (Server-side)
# Required for the backend to create verified users directly
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend Configuration (Email Service)
RESEND_API_KEY=re_123456789...

# Backend Server Configuration
SERVER_PORT=5174
```

> **Warning**: Never commit your `.env` file to version control.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ShinobiKoda/eat-easy.git
    cd eat-easy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Development

To run the application locally, you need to start both the **backend server** and the **frontend client**.

1.  **Start the Backend Server:**
    Open a terminal and run:

    ```bash
    npm run server
    ```

    _This runs the Express server on port 5174 (or as defined in `.env`)._

2.  **Start the Frontend Client:**
    Open a **second terminal** and run:

    ```bash
    npm run dev
    ```

    _This starts the Vite development server, usually on port 5173._

3.  **Access the App:**
    Open your browser and navigate to `http://localhost:5173`.

## Production Build

To deploy the application, you need to build both the frontend and the backend.

1.  **Build Frontend and Backend:**

    ```bash
    npm run build         # Builds the frontend to /dist
    npm run build:server  # Builds the backend to /dist (server)
    ```

2.  **Start Production Server:**
    ```bash
    npm run start:server
    ```
    _This starts the compiled Node.js server._

## Project Structure

- **`src/components/`**: Reusable UI components (auth, animations, layout).
- **`src/pages/`**: Main application pages.
- **`src/Server.ts`**: Express backend source code.
- **`src/services/`**: API service layers (UserProfile, etc.).
- **`src/config/`**: Configuration files (Supabase client).

## Contributing

Contributions are welcome!

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Open a Pull Request.

## License

[MIT](LICENSE)
