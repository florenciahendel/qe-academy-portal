import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  Badge,
  TextInput,
  Select,
  Group,
} from "@mantine/core";

import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

import { courses } from "../data/courses";

export default function CourseManagementPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const categories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  const statuses = [
    ...new Set(courses.map((course) => course.status)),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      course.code
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter ||
      course.category === categoryFilter;

    const matchesStatus =
      !statusFilter ||
      course.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  const rows = filteredCourses.map((course) => (
    <Table.Tr
      key={course.id}
      data-testid={`admin-course-row-${course.id}`}
    >
      <Table.Td>{course.code}</Table.Td>

      <Table.Td>{course.name}</Table.Td>

      <Table.Td>{course.category}</Table.Td>

      <Table.Td>{course.level}</Table.Td>

      <Table.Td>
        <Badge
          color={
            course.status === "Active"
              ? "green"
              : course.status === "Inactive"
              ? "yellow"
              : "gray"
          }
        >
          {course.status}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Link
          to={`/course-detail/${course.id}`}
          data-testid={`manage-course-${course.id}`}
        >
          View Details
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppCard>
      <PageHeader
        title="Course Management"
        subtitle="Manage platform courses."
      />

      <TextInput
        mb="md"
        label="Search Courses"
        placeholder="Search by name or code..."
        value={search}
        data-testid="course-management-search"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Group mb="md">
        <Select
          label="Category"
          placeholder="All"
          clearable
          data={categories}
          value={categoryFilter}
          data-testid="course-management-category"
          onChange={(value) =>
            setCategoryFilter(value || "")
          }
        />

        <Select
          label="Status"
          placeholder="All"
          clearable
          data={statuses}
          value={statusFilter}
          data-testid="course-management-status"
          onChange={(value) =>
            setStatusFilter(value || "")
          }
        />
      </Group>

      <Table
        striped
        highlightOnHover
        data-testid="course-management-table"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </AppCard>
  );
}