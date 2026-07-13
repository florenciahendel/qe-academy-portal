import { useEffect, useState } from "react";

import {
  Table,
  Badge,
  TextInput,
  Select,
  Group,
} from "@mantine/core";

import { Link } from "react-router-dom";

import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users")
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

      <Table.Td>{user.role}</Table.Td>

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
        <Link
          to={`/users/${user.id}`}
          data-testid={`view-user-${user.id}`}
        >
          View Details
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppCard>
      <PageHeader
        title="User Management"
        subtitle="Manage platform users."
      />

      <TextInput
        mb="md"
        label="Search Users"
        placeholder="Search by name or email..."
        value={search}
        data-testid="user-search"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Group mb="md">
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
      </Group>

      <Table
        striped
        highlightOnHover
        data-testid="users-table"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </AppCard>
  );
}