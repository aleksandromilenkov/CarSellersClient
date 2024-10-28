import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import ProtectedRoute from "./UI/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import FavoritesCars from "./Pages/FavoritesPage";
import SearchPage from "./Pages/SearchPage";
import CompaniesPage from "./Pages/CompaniesPage";
import RegisterPage from "./Pages/RegisterPage";
import CarCompany from "./Components/Companies/CarCompany";
import CarDetail from "./Components/Cars/CarDetail";
import CarCompanyDetail from "./Components/Companies/CarCompanyDetail";
import FavoritesPage from "./Pages/FavoritesPage";
import ProfilePage from "./Pages/ProfilePage";
import ProtectedAdminRoute from "./Utils/Helpers/ProtectedAdminRoute";
import AdminPanelPage from "./Pages/AdminPanelPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import TermsOfServicePage from "./Pages/TermsPage";
import ResetPassword from "./Components/Authentication/ResetPasswordForm";
type Props = {};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0, // how much time is data fresh (no network request will be requestet in this specified time)
    },
  },
});
const App = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacyPolicy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsOfServicePage />} />
            <Route path="cars/:carId" element={<CarDetail />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="companies/:companyId" element={<CarCompanyDetail />} />
            <Route
              path="favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          <Route path="adminPanel" element = {<ProtectedAdminRoute>
            <AdminPanelPage/>
          </ProtectedAdminRoute>}/>
          <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
