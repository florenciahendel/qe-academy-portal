import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Badge, Button } from "@mantine/core";

import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

import { useAuth } from "../context/AuthContext";

export default function CourseDetailPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourseData = () => {
    Promise.all([
      fetch(`http://127.0.0.1:8000/courses/${id}`).then((response) => {
        if (!response.ok) {
          throw new Error("Course not found");
        }

        return response.json();
      }),
      fetch("http://127.0.0.1:8000/enrollments").then((response) =>
        response.json(),
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
      <AppCard>
        <PageHeader
          title="Loading..."
          subtitle="Fetching course information."
        />
      </AppCard>
    );
  }

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
      enrollment.user_id === user?.id && enrollment.course_id === course.id,
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
    <AppCard>
      <PageHeader title={course.name} subtitle={course.short_description} />

      <p data-testid="course-code">Code: {course.code}</p>

      <p data-testid="course-category">Category: {course.category}</p>

      <p data-testid="course-level">Level: {course.level}</p>

      <p data-testid="course-duration">
        Duration: {course.duration_hours} hours
      </p>

      <p data-testid="course-instructor">Instructor: {course.instructor}</p>

      <p data-testid="course-enrollments">
        Enrolled Students: {course.enrolled_students}
      </p>

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

      {user?.role === "Student" && (
        <Button
          mt="md"
          data-testid="course-enroll-button"
          disabled={isEnrolled}
          onClick={handleEnroll}
        >
          {isEnrolled ? "Already Enrolled" : "Enroll"}
        </Button>
      )}

      <p style={{ marginTop: "20px" }} data-testid="course-description">
        {course.description}
      </p>
    </AppCard>
  );
}
