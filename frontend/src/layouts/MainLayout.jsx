import {
  AppShell,
  Box,
  Button,
  Group,
  NavLink,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function MainLayout({
  children,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 260,
        breakpoint: "sm",
      }}
      header={{
        height: 70,
      }}
      bg="#F8FAFC"
    >
      <AppShell.Header
        style={{
          background: "#FFFFFF",
          borderBottom:
            "1px solid #E2E8F0",
        }}
      >
        <Group
          h="100%"
          px="lg"
          justify="space-between"
        >
          <Title
            order={3}
            c="#0F4C5C"
            data-testid="portal-title"
          >
            QE Academy Portal
          </Title>

          <Group gap="md">
            <Stack gap={0}>
              <Text
                fw={600}
                size="sm"
              >
                {user?.firstName}{" "}
                {user?.lastName}
              </Text>

              <Text
                size="xs"
                c="dimmed"
              >
                {user?.role}
              </Text>
            </Stack>

            <Button
              variant="light"
              color="red"
              data-testid="logout-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        bg="#FFFFFF"
      >
        <Stack gap="xs">
          <Box mb="md">
            <Text
              size="xs"
              c="dimmed"
              tt="uppercase"
              fw={700}
            >
              Navigation
            </Text>
          </Box>

          <NavLink
            component={Link}
            to="/dashboard"
            label="Dashboard"
            active={
              location.pathname ===
              "/dashboard"
            }
          />

          <NavLink
            component={Link}
            to="/profile"
            label="Profile"
            active={
              location.pathname ===
              "/profile"
            }
          />

          {user?.role ===
            "Student" && (
            <>
              <NavLink
                component={Link}
                to="/courses"
                label="Courses"
                active={
                  location.pathname ===
                  "/courses"
                }
              />

              <NavLink
                component={Link}
                to="/my-courses"
                label="My Courses"
                active={
                  location.pathname ===
                  "/my-courses"
                }
              />
            </>
          )}

          {user?.role ===
            "Instructor" && (
            <>
              <NavLink
                component={Link}
                to="/courses"
                label="Courses"
                active={
                  location.pathname ===
                  "/courses"
                }
              />

              <NavLink
                component={Link}
                to="/course-management"
                label="Course Management"
                active={
                  location.pathname ===
                  "/course-management"
                }
              />
            </>
          )}

          {user?.role === "Admin" && (
            <>
              <NavLink
                component={Link}
                to="/users"
                label="Users"
                active={
                  location.pathname.startsWith(
                    "/users"
                  )
                }
              />

              <NavLink
                component={Link}
                to="/course-management"
                label="Course Management"
                active={
                  location.pathname ===
                  "/course-management"
                }
              />
            </>
          )}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}