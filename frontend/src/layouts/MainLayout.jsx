import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div>
      <header data-testid="main-header">
        <h1 data-testid="portal-title">
          QE Academy Portal
        </h1>

        <nav data-testid="main-navigation">
          <Link
            data-testid="menu-dashboard"
            to="/dashboard"
          >
            Dashboard
          </Link>

          {" | "}

          <Link
            data-testid="menu-courses"
            to="/courses"
          >
            Courses
          </Link>

          {" | "}

          <Link
            data-testid="menu-my-courses"
            to="/my-courses"
          >
            My Courses
          </Link>

          {" | "}

          <Link
            data-testid="menu-profile"
            to="/profile"
          >
            Profile
          </Link>

          {" | "}

          <Link
            data-testid="menu-users"
            to="/users"
          >
            Users
          </Link>

          {" | "}

          <Link
            data-testid="menu-course-management"
            to="/course-management"
          >
            Course Management
          </Link>
        </nav>

        <hr />
      </header>

      <main data-testid="page-content">
        {children}
      </main>
    </div>
  );
}
