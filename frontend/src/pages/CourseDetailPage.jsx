import { useParams } from "react-router-dom";
import { Badge, Button } from "@mantine/core";

import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

import { courses } from "../data/courses";
import { useAuth } from "../context/AuthContext";

export default function CourseDetailPage() {
  const { id } = useParams();

  const {
    user,
    enrollments,
    setEnrollments,
  } = useAuth();

  const course = courses.find(
    (course) => course.id === Number(id)
  );

  if (!course) {
    return (
      <AppCard>
        <PageHeader
          title="Course Not Found"
          subtitle="The requested course does not exist."
        />
      </AppCard>
    );
  }

  const isEnrolled = enrollments.some(
    (enrollment) =>
      enrollment.userId === user?.id &&
      enrollment.courseId === course.id
  );

  const handleEnroll = () => {
    if (isEnrolled) {
      return;
    }

    setEnrollments([
      ...enrollments,
      {
        userId: user.id,
        courseId: course.id,
        status: "Active",
      },
    ]);
  };

  return (
    <AppCard>
      <PageHeader
        title={course.name}
        subtitle={course.shortDescription}
      />

      <p data-testid="course-code">
        Code: {course.code}
      </p>

      <p data-testid="course-category">
        Category: {course.category}
      </p>

      <p data-testid="course-level">
        Level: {course.level}
      </p>

      <p data-testid="course-duration">
        Duration: {course.durationHours} hours
      </p>

      <p data-testid="course-instructor">
        Instructor: {course.instructor}
      </p>

      <p data-testid="course-enrollments">
        Enrolled Students: {course.enrolledStudents}
      </p>

      <Badge data-testid="course-status">
        {course.status}
      </Badge>

      <Button
        mt="md"
        data-testid="course-enroll-button"
        disabled={isEnrolled}
        onClick={handleEnroll}
      >
        {isEnrolled
          ? "Already Enrolled"
          : "Enroll"}
      </Button>

      <p
        style={{ marginTop: "20px" }}
        data-testid="course-description"
      >
        {course.description}
      </p>
    </AppCard>
  );
}