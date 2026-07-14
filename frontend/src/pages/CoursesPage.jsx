import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) =>
        console.error("Error loading courses:", error)
      );
  }, []);

  const categories = [
    ...new Set(
      courses.map((course) => course.category)
    ),
  ];

  const levels = [
    ...new Set(
      courses.map((course) => course.level)
    ),
  ];

  const statuses = [
    ...new Set(
      courses.map((course) => course.status)
    ),
  ];

  const filteredCourses = courses.filter(
    (course) => {
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

      const matchesLevel =
        !levelFilter ||
        course.level === levelFilter;

      const matchesStatus =
        !statusFilter ||
        course.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesStatus
      );
    }
  );

return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={1}>
          Course Catalog
        </Title>

        <Text c="dimmed">
          Browse available training courses.
        </Text>
      </Stack>

      <Grid>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <TextInput
            label="Search"
            placeholder="Search by name or code..."
            value={search}
            data-testid="course-search"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 2 }}>
          <Select
            label="Category"
            placeholder="All"
            clearable
            data={categories}
            value={categoryFilter}
            data-testid="course-filter-category"
            onChange={(value) =>
              setCategoryFilter(value || "")
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 2 }}>
          <Select
            label="Level"
            placeholder="All"
            clearable
            data={levels}
            value={levelFilter}
            data-testid="course-filter-level"
            onChange={(value) =>
              setLevelFilter(value || "")
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Select
            label="Status"
            placeholder="All"
            clearable
            data={statuses}
            value={statusFilter}
            data-testid="course-filter-status"
            onChange={(value) =>
              setStatusFilter(value || "")
            }
          />
        </Grid.Col>
      </Grid>

      <Grid>
        {filteredCourses.map((course) => (
          <Grid.Col
            key={course.id}
            span={{ base: 12, md: 6, lg: 4 }}
          >
            <Card
              withBorder
              radius="lg"
              shadow="xs"
              h="100%"
              data-testid={`course-card-${course.id}`}
            >
              <Stack
                gap="md"
                justify="space-between"
                h="100%"
              >
                <Stack gap="sm">
                  <Group justify="space-between">
                    <Badge
                      color="petrol"
                      variant="light"
                    >
                      {course.code}
                    </Badge>

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
                  </Group>

                  <Title order={4}>
                    {course.name}
                  </Title>

                  <Group gap="xs">
                    <Badge
                      variant="outline"
                      color="petrol"
                    >
                      {course.category}
                    </Badge>

                    <Badge
                      variant="outline"
                      color="gray"
                    >
                      {course.level}
                    </Badge>
                  </Group>

                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    {course.short_description ||
                      "No description available."}
                  </Text>
                </Stack>

                <Stack gap="xs">
                  <Text
                    size="sm"
                    fw={500}
                  >
                    Instructor:{" "}
                    {course.instructor ||
                      "TBD"}
                  </Text>

                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    Duration:{" "}
                    {course.duration_hours}h
                  </Text>

                  <Button
                    component={Link}
                    to={`/course-detail/${course.id}`}
                    color="petrol"
                    fullWidth
                    data-testid={`view-course-${course.id}`}
                  >
                    View Details
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
} 
  