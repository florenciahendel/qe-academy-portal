import {
  Badge,
  Card,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Stack gap="lg">
      <Paper
        p="xl"
        radius="lg"
        bg="#FFFFFF"
        withBorder
      >
        <Stack gap="sm">
          <Badge
            color="petrol"
            variant="light"
            w="fit-content"
          >
            Profile
          </Badge>

          <Title order={1}>
            {user?.firstName} {user?.lastName}
          </Title>

          <Text
            c="dimmed"
            size="lg"
          >
            View your account information and profile details.
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col span={6}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Role
            </Text>

            <Title order={3}>
              {user?.role}
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Status
            </Text>

            <Title order={3}>
              {user?.status}
            </Title>
          </Card>
        </Grid.Col>
      </Grid>

      <Paper
        p="xl"
        radius="lg"
        withBorder
      >
        <Stack gap="lg">
          <Title order={3}>
            User Information
          </Title>

          <Grid>
            <Grid.Col span={6}>
              <Stack gap={4}>
                <Text
                  size="sm"
                  c="dimmed"
                >
                  First Name
                </Text>

                <Text
                  fw={600}
                  data-testid="profile-first-name"
                >
                  {user?.firstName}
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack gap={4}>
                <Text
                  size="sm"
                  c="dimmed"
                >
                  Last Name
                </Text>

                <Text
                  fw={600}
                  data-testid="profile-last-name"
                >
                  {user?.lastName}
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={12}>
              <Stack gap={4}>
                <Text
                  size="sm"
                  c="dimmed"
                >
                  Email
                </Text>

                <Text
                  fw={600}
                  data-testid="profile-email"
                >
                  {user?.email}
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack gap={4}>
                <Text
                  size="sm"
                  c="dimmed"
                >
                  Role
                </Text>

                <Badge
                  variant="light"
                  color="petrol"
                  w="fit-content"
                  data-testid="profile-role"
                >
                  {user?.role}
                </Badge>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack gap={4}>
                <Text
                  size="sm"
                  c="dimmed"
                >
                  Status
                </Text>

                <Badge
                  color={
                    user?.status === "Active"
                      ? "green"
                      : "yellow"
                  }
                  w="fit-content"
                  data-testid="profile-status"
                >
                  {user?.status}
                </Badge>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Paper
        p="xl"
        radius="lg"
        withBorder
      >
        <Stack gap={4}>
          <Title order={4}>
            Profile Management
          </Title>

          <Text
            c="dimmed"
            size="sm"
          >
            Profile editing capabilities will be added in a future release.
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}