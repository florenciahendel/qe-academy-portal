import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import AppContainer from "../components/shared/AppContainer";

export default function MainLayout({ children }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <AppContainer>
      <header data-testid="main-header">
        <h1 data-testid="portal-title">QE Academy Portal</h1>

        <nav data-testid="main-navigation">
          <Link data-testid="menu-dashboard" to="/dashboard">
            Dashboard
          </Link>

          {" | "}

          <Link data-testid="menu-courses" to="/courses">
            Courses
          </Link>

          {" | "}

          <Link data-testid="menu-my-courses" to="/my-courses">
            My Courses
          </Link>

          {" | "}

          <Link data-testid="menu-profile" to="/profile">
            Profile
          </Link>

          {" | "}

          <Link data-testid="menu-users" to="/users">
            Users
          </Link>

          {" | "}

          <Link data-testid="menu-course-management" to="/course-management">
            Course Management
          </Link>
          <Button
            variant="light"
            color="red"
            data-testid="logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>

        <hr />
      </header>

      <main data-testid="page-content">{children}</main>
    </AppContainer>
  );
}
