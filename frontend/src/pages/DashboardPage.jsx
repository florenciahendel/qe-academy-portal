import {
  Badge,
  Card,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <Stack gap="lg">
      <Paper
        p="xl"
        radius="lg"
        bg="#FFFFFF"
        shadow="xs"
        withBorder
      >
        <Stack gap="xs">
          <Badge
            color="petrol"
            variant="light"
            w="fit-content"
          >
            QE Academy Portal
          </Badge>

          <Title
            order={1}
            c="#0F172A"
            data-testid="dashboard-title"
          >
            Welcome back, {user?.firstName}
          </Title>

          <Text
            c="#64748B"
            size="lg"
          >
            Continue your learning journey and expand your QA skills.
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            withBorder
            radius="lg"
            bg="#FFFFFF"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Role
            </Text>

            <Title
              order={3}
              mt={4}
            >
              {user?.role}
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            withBorder
            radius="lg"
            bg="#FFFFFF"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Status
            </Text>

            <Title
              order={3}
              mt={4}
            >
              {user?.status}
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            withBorder
            radius="lg"
            bg="#FFFFFF"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Learning Paths
            </Text>

            <Title
              order={3}
              mt={4}
            >
              6
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card
            withBorder
            radius="lg"
            bg="#FFFFFF"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Skills
            </Text>

            <Title
              order={3}
              mt={4}
            >
              QA
            </Title>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper
            p="xl"
            radius="lg"
            bg="#FFFFFF"
            withBorder
          >
            <Stack gap="md">
              <Title order={3}>
                Recommended Learning
              </Title>

              <Group grow>
                <Card
                  withBorder
                  radius="md"
                >
                  <Badge
                    color="petrol"
                    variant="light"
                  >
                    Automation
                  </Badge>

                  <Text
                    fw={600}
                    mt="sm"
                  >
                    Playwright Fundamentals
                  </Text>

                  <Text
                    c="dimmed"
                    size="sm"
                    mt={4}
                  >
                    Build robust UI automation foundations.
                  </Text>
                </Card>

                <Card
                  withBorder
                  radius="md"
                >
                  <Badge
                    color="petrol"
                    variant="light"
                  >
                    AI for QA
                  </Badge>

                  <Text
                    fw={600}
                    mt="sm"
                  >
                    AI Assisted Test Design
                  </Text>

                  <Text
                    c="dimmed"
                    size="sm"
                    mt={4}
                  >
                    Accelerate test analysis using AI.
                  </Text>
                </Card>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper
            p="xl"
            radius="lg"
            bg="#FFFFFF"
            withBorder
          >
            <Stack gap="md">
              <Title order={3}>
                Profile
              </Title>

              <Text>
                {user?.firstName} {user?.lastName}
              </Text>

              <Text c="dimmed">
                {user?.email}
              </Text>

              <Badge
                color="petrol"
                variant="light"
                w="fit-content"
              >
                {user?.role}
              </Badge>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}