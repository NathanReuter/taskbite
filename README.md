# TaskBite 🍏

TaskBite is a comprehensive task management application designed to help users efficiently organize their tasks into lists and boards, similar to Trello. The application is developed with modern web technologies including TypeScript, Node.js, Express, and React, with MySQL for data storage.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- User authentication (signup, login, delete user)
- Task management (create, update, delete tasks)
- Board and list management (create, update, delete boards and lists)
- JWT-based authentication
- Comprehensive test suite with unit and integration tests
- Docker support for development and testing environments

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-bite.git
   cd task-bite
   ```

## Usage

### Backend

The backend is built with Node.js and Express, providing a robust API for managing tasks, boards, and users. It includes user authentication and various CRUD operations for tasks and boards.

### Frontend

The frontend is built with React and Tailwind CSS, offering a sleek and modern user interface. It interacts with the backend API to perform various task management operations.

## Scripts

### Backend
Navigate to the `backend` directory to use the following scripts:
- `yarn dev`: Start the development server
- `yarn build`: Build the project
- `yarn start`: Start the production server
- `yarn test`: Run tests
- `yarn migrate`: Run database migrations

### Frontend
Navigate to the `frontend` directory to use the following scripts:
- `yarn dev`: Start the development server
- `yarn build`: Build the project
- `yarn lint`: Run linter
- `yarn preview`: Preview the production build

## Project Structure

### Backend
```
backend
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── tests
│   └── utils
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

### Frontend
```
frontend
├── public
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── services
│   ├── types
│   └── utils
├── package.json
└── tsconfig.json
```

## Marketing Description

### Manage Your Tasks Effortlessly
Organize your tasks, lists, and boards in one place with TaskBite. Boost your productivity and keep track of your projects effortlessly. TaskBite is designed to streamline your task management process, making it easy to stay on top of your work and collaborate with your team.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

This README provides an overview of the TaskBite project, highlighting its main features and structure. For detailed instructions on how to run each project, please refer to their respective README files in the `backend` and `frontend` directories.
