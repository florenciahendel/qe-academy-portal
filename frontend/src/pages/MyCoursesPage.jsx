import { useEffect, useState } from "react";

import {
  Table,
  Badge,
  Button,
  Text,
} from "@mantine/core";

import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

import { useAuth } from "../context/AuthContext";

export default function MyCoursesPage() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMyCoursesData = () => {
    setLoading(true);

    Promise.all([
      fetch("http://127.0.0.1:8000/courses").then((response) =>
        response.json()
      ),
      fetch("http://127.0.0.1:8000/enrollments").then((response) =>
        response.json()
      ),
    ])
      .then(([coursesData, enrollmentsData]) => {
        setCourses(coursesData);
        setEnrollments(enrollmentsData);
      })
      .catch((error) => {
        console.error("Error loading my courses:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMyCoursesData();
  }, []);

  const userEnrollments = enrollments.filter(
    (enrollment) => enrollment.user_id === user?.id
  );

  const myCourses = userEnrollments
    .map((enrollment) => {
      const course = courses.find(
        (course) => course.id === enrollment.course_id
      );

      if (!course) {
        return null;
      }

      return {
        ...course,
        enrollmentStatus: enrollment.status,
      };
    })
    .filter(Boolean);

  const handleCancelEnrollment = (courseId) => {
    fetch(
      `http://127.0.0.1:8000/enrollments/${user.id}/${courseId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cancel enrollment failed");
        }

        return response.json();
      })
      .then(() => {
        loadMyCoursesData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const rows = myCourses.map((course) => (
    <Table.Tr
      key={course.id}
      data-testid={`my-course-row-${course.id}`}
    >
      <Table.Td>{course.code}</Table.Td>

      <Table.Td>{course.name}</Table.Td>

      <Table.Td>{course.category}</Table.Td>

      <Table.Td>{course.level}</Table.Td>

      <Table.Td>
        <Badge color="green">
          {course.enrollmentStatus}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Button
          color="red"
          size="xs"
          data-testid={`cancel-enrollment-${course.id}`}
          onClick={() =>
            handleCancelEnrollment(course.id)
          }
        >
          Cancel
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppCard>
      <PageHeader
        title="My Courses"
        subtitle="Courses where you are currently enrolled."
      />

      {loading && (
        <Text data-testid="my-courses-loading">
          Loading enrollments...
        </Text>
      )}

      {!loading && myCourses.length === 0 && (
        <Text data-testid="my-courses-empty-state">
          You are not enrolled in any courses.
        </Text>
      )}

      {!loading && myCourses.length > 0 && (
        <Table
          striped
          highlightOnHover
          data-testid="my-courses-table"
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
      )}
    </AppCard>
  );
}