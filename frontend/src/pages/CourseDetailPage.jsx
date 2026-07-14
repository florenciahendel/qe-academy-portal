import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useAuth } from "../context/AuthContext";

export default function CourseDetailPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourseData = () => {
    Promise.all([
      fetch(`http://127.0.0.1:8000/courses/${id}`).then(
        (response) => {
          if (!response.ok) {
            throw new Error("Course not found");
          }

          return response.json();
        }
      ),
      fetch("http://127.0.0.1:8000/enrollments").then(
        (response) => response.json()
      ),
    ])
      .then(([courseData, enrollmentData]) => {
        setCourse(courseData);
        setEnrollments(enrollmentData);
      })
      .catch((error) => {
        console.error(error);
        setCourse(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourseData();
  }, [id]);

  if (loading) {
    return (
      <Stack>
        <Title order={2}>Loading...</Title>
        <Text c="dimmed">
          Fetching course information.
        </Text>
      </Stack>
    );
  }

  if (!course) {
    return (
      <Stack>
        <Title order={2}>
          Course Not Found
        </Title>

        <Text c="dimmed">
          The requested course does not exist.
        </Text>
      </Stack>
    );
  }

  const isEnrolled = enrollments.some(
    (enrollment) =>
      enrollment.user_id === user?.id &&
      enrollment.course_id === course.id
  );

  const handleEnroll = () => {
    fetch("http://127.0.0.1:8000/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        course_id: course.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Enrollment failed");
        }

        return response.json();
      })
      .then(() => {
        loadCourseData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Stack gap="lg">
      <Paper
        p="xl"
        radius="lg"
        bg="#FFFFFF"
        withBorder
      >
        <Stack gap="md">
          <Group>
            <Badge
              color="petrol"
              variant="light"
            >
              {course.category}
            </Badge>

            <Badge
              variant="outline"
              color="gray"
            >
              {course.level}
            </Badge>

            <Badge
              color={
                course.status === "Active"
                  ? "green"
                  : course.status === "Inactive"
                  ? "yellow"
                  : "gray"
              }
              data-testid="course-status"
            >
              {course.status}
            </Badge>
          </Group>

          <Title
            order={1}
            data-testid="course-title"
          >
            {course.name}
          </Title>

          <Text
            size="lg"
            c="dimmed"
          >
            {course.short_description}
          </Text>

          {user?.role === "Student" && (
            <Button
              color="petrol"
              size="md"
              w={220}
              data-testid="course-enroll-button"
              disabled={isEnrolled}
              onClick={handleEnroll}
            >
              {isEnrolled
                ? "Already Enrolled"
                : "Enroll Now"}
            </Button>
          )}
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col span={8}>
          <Paper
            p="xl"
            radius="lg"
            withBorder
            bg="#FFFFFF"
          >
            <Stack gap="md">
              <Title order={3}>
                Course Overview
              </Title>

              <Text
                data-testid="course-description"
              >
                {course.description}
              </Text>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack>
            <Card
              withBorder
              radius="lg"
            >
              <Text
                size="sm"
                c="dimmed"
              >
                Course Code
              </Text>

              <Title
                order={4}
                data-testid="course-code"
              >
                {course.code}
              </Title>
            </Card>

            <Card
              withBorder
              radius="lg"
            >
              <Text
                size="sm"
                c="dimmed"
              >
                Duration
              </Text>

              <Title
                order={4}
                data-testid="course-duration"
              >
                {course.duration_hours}h
              </Title>
            </Card>

            <Card
              withBorder
              radius="lg"
            >
              <Text
                size="sm"
                c="dimmed"
              >
                Students Enrolled
              </Text>

              <Title
                order={4}
                data-testid="course-enrollments"
              >
                {course.enrolled_students}
              </Title>
            </Card>

            <Card
              withBorder
              radius="lg"
            >
              <Text
                size="sm"
                c="dimmed"
              >
                Instructor
              </Text>

              <Title
                order={5}
                data-testid="course-instructor"
              >
                {course.instructor}
              </Title>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}