# Car Sellers Frontend

## Overview

This is the frontend for the Car Sellers application, built with React. It provides a user-friendly interface for managing cars, car models, manufacturers, and companies, with separate panels and permissions for regular users and admins.

## Features

- **Admin Panel**
  - Only accessible to admins
  - Allows creation, editing, and deletion of manufacturers, car models, cars, and companies

- **User Features**
  - View and search for cars without logging in
  - Logged-in users can add and remove cars from their favorites
  - Profile management with options to update details and upload a profile image
  - Password reset functionality with email link

## Technologies Used

- **Framework**: React (using TypeScript)
- **State Management**: Redux Toolkit with Persist
- **Form Handling**: React Hook Form with Yup for validation
- **Data Fetching**: React Query (TanStack)
- **UI Libraries**: Styled Components, Font Awesome, React Icons, React Hot Toast, React Error Boundary

## Project Setup

### Prerequisites

- Node.js and npm (or yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repo-url.git
   cd your-repo-folder
   
### Set up environment variables:
Create a .env file in the root directory.
Add necessary environment variables (e.g., API URL).

### Start Development Server:

    npm start

### Available Scripts

npm start: Runs the app in the development mode.
npm run build: Builds the app for production.
npm test: Runs the test suite.
npm run eject: Ejects the configuration (not reversible).

### Dependencies: 
  @hookform/resolvers: Form validation
  @reduxjs/toolkit: State management
  @tanstack/react-query: Data fetching and caching
  axios: API requests
  dotenv: Environment variable management
  jwt-decode: Token decoding for authentication
  styled-components: Styled CSS in JS
  typescript: Type safety

### Usage
  Admin Actions
    Only admins can access the Admin Panel to manage car-related data (cars, companies, manufacturers, car models).
  User Actions
    Search for cars without logging in.
  Register, log in, and manage favorites (add/remove cars).
  Request a password reset, with an email link provided for reset.
  Update profile, including profile image upload.


### Contributing
If you'd like to contribute, please fork the repository and submit a pull request with your changes.

### License
This project is licensed under the MIT License.
