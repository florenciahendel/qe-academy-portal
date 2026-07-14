import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {API_BASE_URL} from "../config/api";
import {
  Badge,
  Card,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function UserDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Stack>
        <Title order={2}>Loading...</Title>
        <Text c="dimmed">
          Fetching user information.
        </Text>
      </Stack>
    );
  }

  if (!user) {
    return (
      <Stack>
        <Title order={2}>
          User Not Found
        </Title>

        <Text c="dimmed">
          The requested user does not exist.
        </Text>
      </Stack>
    );
  }

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
            User Details
          </Badge>

          <Title order={1}>
            {user.first_name} {user.last_name}
          </Title>

          <Text
            c="dimmed"
            size="lg"
          >
            User profile and platform access information.
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
              {user.role}
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
              {user.status}
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

                <Text fw={600}>
                  {user.first_name}
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

                <Text fw={600}>
                  {user.last_name}
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
                  data-testid="user-detail-email"
                >
                  {user.email}
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
                  color="petrol"
                  variant="light"
                  w="fit-content"
                  data-testid="user-detail-role"
                >
                  {user.role}
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
                    user.status === "Active"
                      ? "green"
                      : "yellow"
                  }
                  w="fit-content"
                  data-testid="user-detail-status"
                >
                  {user.status}
                </Badge>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
}