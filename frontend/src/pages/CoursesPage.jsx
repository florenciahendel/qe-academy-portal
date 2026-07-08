import { Table, Badge, TextInput, Select, Group } from "@mantine/core";
import { useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";
import { courses } from "../data/courses";
import { Link } from "react-router-dom";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const categories = [...new Set(courses.map((course) => course.category))];
  const levels = [...new Set(courses.map((course) => course.level))];
  const statuses = [...new Set(courses.map((course) => course.status))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter || course.category === categoryFilter;

    const matchesLevel = !levelFilter || course.level === levelFilter;

    const matchesStatus = !statusFilter || course.status === statusFilter;

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  const rows = filteredCourses.map((course) => (
    <Table.Tr key={course.id} data-testid={`course-row-${course.id}`}>
      <Table.Td>{course.code}</Table.Td>
      <Table.Td>{course.name}</Table.Td>
      <Table.Td>{course.category}</Table.Td>
      <Table.Td>{course.level}</Table.Td>
      <Table.Td>{course.durationHours}</Table.Td>
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
          data-testid={`view-course-${course.id}`}
        >
          View Details
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppCard>
      <PageHeader
        title="Course Catalog"
        subtitle="Browse available training courses."
      />
      <TextInput
        mb="md"
        label="Search Courses"
        placeholder="Search by name or code..."
        value={search}
        data-testid="course-search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Group mb="md">
        <Select
          label="Category"
          placeholder="All"
          clearable
          data={categories}
          value={categoryFilter}
          data-testid="course-filter-category"
          onChange={(value) => setCategoryFilter(value || "")}
        />

        <Select
          label="Level"
          placeholder="All"
          clearable
          data={levels}
          value={levelFilter}
          data-testid="course-filter-level"
          onChange={(value) => setLevelFilter(value || "")}
        />

        <Select
          label="Status"
          placeholder="All"
          clearable
          data={statuses}
          value={statusFilter}
          data-testid="course-filter-status"
          onChange={(value) => setStatusFilter(value || "")}
        />
      </Group>

      <Table striped highlightOnHover data-testid="courses-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th>Duration</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </AppCard>
  );
}
