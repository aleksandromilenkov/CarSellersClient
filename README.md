# Car Sellers Frontend

## Overview

This is the frontend for the Car Sellers application, built with React. It provides a user-friendly interface for managing cars, car models, manufacturers, and companies, with separate panels and permissions for regular users and admins.

### Home page:

![CarSellersHome](https://github.com/user-attachments/assets/870c2c91-92c4-422d-8d43-482eeef4e6c9)

### Footer:

![About](https://github.com/user-attachments/assets/4cf942f8-8c66-4697-becf-c18337b77d0e)
![Contact](https://github.com/user-attachments/assets/46e64e4d-cdf4-43e0-a8f1-2b2799252d62)

### Search page:

![SearchForm](https://github.com/user-attachments/assets/f7bb9224-6705-477e-af05-192d47e001c3)
![SearchResults](https://github.com/user-attachments/assets/8ac754df-3bf0-4abd-a247-33ff18951ba8)
![SearchResultsExample](https://github.com/user-attachments/assets/6a93cc96-e664-4d1f-b482-b90f7fe08b20)
![CarSearchResultExample](https://github.com/user-attachments/assets/bbfdae50-9f24-498e-a640-131cba417946)

### Favorites Page: 

![FavoriteCars](https://github.com/user-attachments/assets/69de1e15-7ff5-477c-ac95-26d14a59758b)

### Companies: 
![CarSellersCompanies](https://github.com/user-attachments/assets/10390470-96f8-4d61-8c64-d50d60b7ddb5)
![CarSellersCompaniesEdit](https://github.com/user-attachments/assets/64a9bd19-18db-40c0-a7b7-9ef46d8c17bb)
![CarSellersCompaniesDelete](https://github.com/user-attachments/assets/ffb7c8c0-49a3-424c-98a8-2596cc8b0898)
![CarSellersCompaniesDetails](https://github.com/user-attachments/assets/05757f5a-ac42-4231-8857-cb782fb6cc9d)

### Admin Panel:

![AdminPanel](https://github.com/user-attachments/assets/0f1809ad-2371-4a05-95c2-53ebdceb8d45)
![AdminPanel2](https://github.com/user-attachments/assets/ca1915b5-93dd-45ce-a402-ca8cb091f680)
![AdminPanelManufacturer](https://github.com/user-attachments/assets/e34c35f8-4edd-4993-b379-040f5ad81d9a)
![AdminPanelCompany](https://github.com/user-attachments/assets/268eba95-df63-4bed-a46a-ca40f3cf9433)

### Car:
![EditCarForm](https://github.com/user-attachments/assets/aed5f27d-bca8-441f-8cf2-8d77fb067dcb)
![DeleteCar](https://github.com/user-attachments/assets/c19572af-0438-469d-96f9-489d1d90de32)
![CarDisplayWithoutAdmin](https://github.com/user-attachments/assets/905e9ced-8ba3-4d0a-afcb-f2d1ef7f3eb3)

### User:
![ProfileAdmin](https://github.com/user-attachments/assets/f3de7cb2-36a4-4a92-84ec-254799f0f6b1)
![Login](https://github.com/user-attachments/assets/017d5463-fcff-4f8a-91d9-9fa872800cd8)
![ForgotPassword](https://github.com/user-attachments/assets/be7914f4-c96c-4fdb-b0fa-3772b68b57ed)
![Register](https://github.com/user-attachments/assets/a08a393b-3d2d-4d97-b59b-cf121ce4c292)
![PasswordResetEmail](https://github.com/user-attachments/assets/5465938a-1698-4fcf-bdab-a075b72b67ff)
![ProfileUser](https://github.com/user-attachments/assets/7828c6a9-b440-4c29-8436-2dc8de4315ef)


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
