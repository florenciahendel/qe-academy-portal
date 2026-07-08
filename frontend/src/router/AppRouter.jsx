import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CoursesPage from "../pages/CoursesPage";
import ProfilePage from "../pages/ProfilePage";
import MyCoursesPage from "../pages/MyCoursesPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import UserDetailPage from "../pages/UserDetailPage";
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
            <RoleProtectedRoute
              allowedRoles={["Student"]}
            >
              <MainLayout>
                <MyCoursesPage />
              </MainLayout>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/course-detail/:id"
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
            <RoleProtectedRoute
              allowedRoles={["Admin"]}
            >
              <MainLayout>
                <UserManagementPage />
              </MainLayout>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <RoleProtectedRoute
              allowedRoles={["Admin"]}
            >
              <MainLayout>
                <UserDetailPage />
              </MainLayout>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/course-management"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "Admin",
                "Instructor",
              ]}
            >
              <MainLayout>
                <CourseManagementPage />
              </MainLayout>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}