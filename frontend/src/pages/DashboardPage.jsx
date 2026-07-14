import { useEffect, useState } from "react";

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

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/courses").then((response) =>
        response.json(),
      ),
      fetch("http://127.0.0.1:8000/enrollments").then((response) =>
        response.json(),
      ),
    ])
      .then(([coursesData, enrollmentsData]) => {
        setCourses(coursesData);
        setEnrollments(enrollmentsData);
      })
      .catch((error) => console.error("Error loading dashboard data:", error));
  }, []);

  const myEnrollments = enrollments.filter(
    (enrollment) => enrollment.user_id === user?.id,
  );

  const enrolledCourseIds = myEnrollments.map(
    (enrollment) => enrollment.course_id,
  );

  const recommendedCourses = courses
    .filter(
      (course) =>
        course.status === "Active" && !enrolledCourseIds.includes(course.id),
    )
    .slice(0, 3);

  return (
    <Stack gap="lg">
      <Paper p="xl" radius="lg" bg="#FFFFFF" shadow="xs" withBorder>
        <Stack gap="xs">
          <Badge color="petrol" variant="light" w="fit-content">
            QE Academy Portal
          </Badge>

          <Title order={1} c="#0F172A" data-testid="dashboard-title">
            Welcome back, {user?.firstName}
          </Title>

          <Text c="#64748B" size="lg">
            {user?.role === "Student" &&
              "Continue your learning journey and build your QA skills."}

            {user?.role === "Instructor" &&
              "Manage courses, support learners and grow the academy content."}

            {user?.role === "Admin" &&
              "Monitor platform activity, manage users and oversee the learning catalog."}
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col span={3}>
          <Card withBorder radius="lg">
            <Text size="sm" c="dimmed">
              Role
            </Text>

            <Title order={3}>{user?.role}</Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card withBorder radius="lg">
            <Text size="sm" c="dimmed">
              Status
            </Text>

            <Title order={3}>{user?.status}</Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card withBorder radius="lg">
            <Text size="sm" c="dimmed">
              Available Courses
            </Text>

            <Title order={3}>{courses.length}</Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card withBorder radius="lg">
            <Text size="sm" c="dimmed">
              My Courses
            </Text>

            <Title order={3}>{myEnrollments.length}</Title>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={8}>
          <Paper p="xl" radius="lg" withBorder>
            <Stack gap="md">
              <Title order={3}>Recommended Courses</Title>

              {recommendedCourses.length === 0 ? (
                <Text c="dimmed">No recommendations available.</Text>
              ) : (
                <Group grow align="stretch">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id} withBorder radius="md">
                      <Stack gap="sm">
                        <Badge color="petrol" variant="light">
                          {course.category}
                        </Badge>

                        <Text fw={600}>{course.name}</Text>

                        <Text size="sm" c="dimmed">
                          {course.short_description}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Group>
              )}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper p="xl" radius="lg" withBorder>
            <Stack gap="md">
              <Title order={3}>Profile</Title>

              <Text>
                {user?.firstName} {user?.lastName}
              </Text>

              <Text c="dimmed">{user?.email}</Text>

              <Badge color="petrol" variant="light" w="fit-content">
                {user?.role}
              </Badge>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
