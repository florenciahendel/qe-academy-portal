import { Table, Badge, Button } from "@mantine/core";

import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

import { useAuth } from "../context/AuthContext";
import { courses } from "../data/courses";

export default function MyCoursesPage() {
  const {
    user,
    enrollments,
    setEnrollments,
  } = useAuth();

  const handleCancelEnrollment = (courseId) => {
    setEnrollments(
      enrollments.filter(
        (enrollment) =>
          !(
            enrollment.userId === user.id &&
            enrollment.courseId === courseId
          )
      )
    );
  };

  const myCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.userId === user?.id &&
        enrollment.courseId === course.id
    )
  );

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
          Enrolled
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
    </AppCard>
  );
}