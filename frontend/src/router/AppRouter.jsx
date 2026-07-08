import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CoursesPage from "../pages/CoursesPage";
import ProfilePage from "../pages/ProfilePage";
import MyCoursesPage from "../pages/MyCoursesPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import UserManagementPage from "../pages/UserManagementPage";
import CourseManagementPage from "../pages/CourseManagementPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CoursesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyCoursesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/course-detail"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CourseDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserManagementPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/course-management"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CourseManagementPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
