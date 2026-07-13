import {
  Badge,
  Box,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Box
      mih="100vh"
      bg="#F8FAFC"
      data-testid="login-page"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        size="lg"
        py="xl"
        data-testid="login-container"
      >
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing="xl"
          verticalSpacing="xl"
        >
          <Stack
            justify="center"
            gap="lg"
            data-testid="login-hero"
          >
            <Badge
              color="petrol"
              variant="light"
              size="lg"
              data-testid="login-brand-badge"
            >
              QE Academy Portal
            </Badge>

            <Title
              order={1}
              c="#0F172A"
              data-testid="login-hero-title"
            >
              Practice QA Automation on a real training platform.
            </Title>

            <Text
              size="lg"
              c="#64748B"
              data-testid="login-hero-description"
            >
              A learning environment designed to practice Playwright,
              locators, assertions, roles, CRUD flows and test data
              management.
            </Text>

            <Stack gap="sm">
              <Group gap="sm">
                <ThemeIcon
                  color="petrol"
                  variant="light"
                  radius="xl"
                >
                  1
                </ThemeIcon>

                <Text
                  c="#0F172A"
                  data-testid="login-feature-automation"
                >
                  Automate realistic UI workflows.
                </Text>
              </Group>

              <Group gap="sm">
                <ThemeIcon
                  color="petrol"
                  variant="light"
                  radius="xl"
                >
                  2
                </ThemeIcon>

                <Text
                  c="#0F172A"
                  data-testid="login-feature-roles"
                >
                  Validate role-based access scenarios.
                </Text>
              </Group>

              <Group gap="sm">
                <ThemeIcon
                  color="petrol"
                  variant="light"
                  radius="xl"
                >
                  3
                </ThemeIcon>

                <Text
                  c="#0F172A"
                  data-testid="login-feature-crud"
                >
                  Practice CRUD, filters, tables and end-to-end flows.
                </Text>
              </Group>
            </Stack>
          </Stack>

          <Paper
            shadow="md"
            radius="lg"
            p="xl"
            withBorder
            data-testid="login-card-wrapper"
            style={{
              backgroundColor: "#FFFFFF",
            }}
          >
            <Stack gap="md">
              <Box>
                <Title
                  order={2}
                  c="#0F172A"
                  data-testid="login-title"
                >
                  Welcome back
                </Title>

                <Text
                  c="#64748B"
                  mt={4}
                  data-testid="login-subtitle"
                >
                  Sign in to access QE Academy Portal.
                </Text>
              </Box>

              <LoginForm />
            </Stack>
          </Paper>
        </SimpleGrid>
      </Container>
    </Box>
  );
}