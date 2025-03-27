# EmployWise Assignment

## Overview

EmployWise is a web application built using React.js and Tailwind CSS with support for dark mode. This project follows a structured approach, starting with UI and routing before integrating APIs.

## Features

- **Dark Mode Support**: The application has a dark mode theme for a better user experience.
- **Routing Setup**: Uses React Router for seamless navigation.
- **UI Components**: Designed with Tailwind CSS for a modern and responsive layout.
- **API Integration (Upcoming)**: Will be integrated once UI and routing are finalized.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Routing**: React Router
- **State Management**: useState, useContext (if needed later)
- **Additional Libraries**:
  - `react-icons` for icons
  - `react-toastify` for notifications

## Installation

1. Clone the repository:
   ```sh
   git clone  https://github.com/Banda-Manjunatha/EmployWise-Assignment.git
   cd employwise
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the project:
   ```sh
   npm run dev
   ```

## Project Structure

```
/employwise
│── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages
│   ├── styles/            # Global styles and themes
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
│── public/                # Static assets
│── package.json           # Dependencies and scripts
│── postcss.config.js     # Tailwind PostCSS configuration
│── vite.config.js         # Vite configuration
```

## Development Guidelines

- Follow a **component-based architecture** for maintainability.
- Keep **UI/UX clean** using Tailwind CSS utility classes.
- Ensure **responsive design** and test dark mode.
- Use **React Router** for navigation.

## API Integration Plan (Next Phase)

- Fetch employee data from backend API.
- Implement authentication if required.
- Handle form submissions and state management effectively.

## Contribution

1. Fork the repository.
2. Create a feature branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit changes and push:
   ```sh
   git commit -m "Added new feature"
   git push origin feature-name
   ```
4. Open a pull request.

## License

MIT License
