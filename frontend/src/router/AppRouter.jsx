import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />

        <Route
          path="/courses"
          element={
            <MainLayout>
              <CoursesPage />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/my-courses"
          element={
            <MainLayout>
              <MyCoursesPage />
            </MainLayout>
          }
        />

        <Route
          path="/course-detail"
          element={
            <MainLayout>
              <CourseDetailPage />
            </MainLayout>
          }
        />

        <Route
          path="/users"
          element={
            <MainLayout>
              <UserManagementPage />
            </MainLayout>
          }
        />

        <Route
          path="/course-management"
          element={
            <MainLayout>
              <CourseManagementPage />
            </MainLayout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
