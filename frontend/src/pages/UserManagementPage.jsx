import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

import {
  Badge,
  Button,
  Card,
  Grid,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("Error loading users:", error)
      );
  }, []);

  const roles = [
    ...new Set(users.map((user) => user.role)),
  ];

  const statuses = [
    ...new Set(users.map((user) => user.status)),
  ];

  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.first_name} ${user.last_name}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      !roleFilter ||
      user.role === roleFilter;

    const matchesStatus =
      !statusFilter ||
      user.status === statusFilter;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });

  const rows = filteredUsers.map((user) => (
    <Table.Tr
      key={user.id}
      data-testid={`user-row-${user.id}`}
    >
      <Table.Td>{user.first_name}</Table.Td>

      <Table.Td>{user.last_name}</Table.Td>

      <Table.Td>{user.email}</Table.Td>

      <Table.Td>
        <Badge
          variant="light"
          color="petrol"
        >
          {user.role}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Badge
          color={
            user.status === "Active"
              ? "green"
              : "yellow"
          }
        >
          {user.status}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Button
          component={Link}
          to={`/users/${user.id}`}
          variant="light"
          color="petrol"
          size="xs"
          data-testid={`view-user-${user.id}`}
        >
          View Details
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={1}>
          User Management
        </Title>

        <Text c="dimmed">
          Manage platform users and roles.
        </Text>
      </Stack>

      <Grid>
        <Grid.Col span={4}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Total Users
            </Text>

            <Title order={2}>
              {users.length}
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Active Users
            </Text>

            <Title order={2}>
              {
                users.filter(
                  (user) =>
                    user.status === "Active"
                ).length
              }
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Roles
            </Text>

            <Title order={2}>
              {roles.length}
            </Title>
          </Card>
        </Grid.Col>
      </Grid>

      <Paper
        p="lg"
        radius="lg"
        withBorder
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Search Users"
                placeholder="Search by name or email..."
                value={search}
                data-testid="user-search"
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                label="Role"
                placeholder="All"
                clearable
                data={roles}
                value={roleFilter}
                data-testid="user-filter-role"
                onChange={(value) =>
                  setRoleFilter(value || "")
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                label="Status"
                placeholder="All"
                clearable
                data={statuses}
                value={statusFilter}
                data-testid="user-filter-status"
                onChange={(value) =>
                  setStatusFilter(value || "")
                }
              />
            </Grid.Col>
          </Grid>

          <Table
            striped
            highlightOnHover
            data-testid="users-table"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  First Name
                </Table.Th>

                <Table.Th>
                  Last Name
                </Table.Th>

                <Table.Th>Email</Table.Th>

                <Table.Th>Role</Table.Th>

                <Table.Th>Status</Table.Th>

                <Table.Th>
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>
    </Stack>
  );
}