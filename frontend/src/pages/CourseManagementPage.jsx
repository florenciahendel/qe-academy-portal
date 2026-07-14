import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

import {
  Alert,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

export default function CourseManagementPage() {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [courseModalOpened, setCourseModalOpened] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [status, setStatus] = useState("Active");
  const [instructor, setInstructor] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState("");

  const loadCourses = () => {
    fetch(`${API_BASE_URL}/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) =>
        console.error("Error loading course management data:", error)
      );
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const resetForm = () => {
    setSelectedCourse(null);
    setCode("");
    setName("");
    setCategory("");
    setLevel("");
    setDurationHours("");
    setStatus("Active");
    setInstructor("");
    setShortDescription("");
    setDescription("");
    setFormError("");
  };

  const openCreateModal = () => {
    resetForm();
    setCourseModalOpened(true);
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setCode(course.code);
    setName(course.name);
    setCategory(course.category);
    setLevel(course.level);
    setDurationHours(String(course.duration_hours));
    setStatus(course.status);
    setInstructor(course.instructor || "");
    setShortDescription(course.short_description || "");
    setDescription(course.description || "");
    setFormError("");
    setCourseModalOpened(true);
  };

  const openDeleteModal = (course) => {
    setCourseToDelete(course);
    setDeleteError("");
    setDeleteModalOpened(true);
  };

  const closeDeleteModal = () => {
    setCourseToDelete(null);
    setDeleteError("");
    setDeleteModalOpened(false);
  };

  const validateForm = () => {
    if (!code.trim()) {
      setFormError("Code is required.");
      return false;
    }

    if (!name.trim()) {
      setFormError("Name is required.");
      return false;
    }

    if (!category) {
      setFormError("Category is required.");
      return false;
    }

    if (!level) {
      setFormError("Level is required.");
      return false;
    }

    if (!durationHours) {
      setFormError("Duration is required.");
      return false;
    }

    if (!instructor.trim()) {
      setFormError("Instructor is required.");
      return false;
    }

    if (!shortDescription.trim()) {
      setFormError("Short description is required.");
      return false;
    }

    if (!description.trim()) {
      setFormError("Description is required.");
      return false;
    }

    return true;
  };

  const handleSaveCourse = () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      code,
      name,
      category,
      level,
      duration_hours: Number(durationHours),
      status,
      instructor,
      short_description: shortDescription,
      description,
    };

    const isEditing = Boolean(selectedCourse);

    const url = isEditing
      ? `${API_BASE_URL}/courses/${selectedCourse.id}`
      : `${API_BASE_URL}/courses`;

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.detail);
          });
        }

        return response.json();
      })
      .then(() => {
        resetForm();
        setCourseModalOpened(false);
        loadCourses();
      })
      .catch((error) => {
        setFormError(error.message);
      });
  };

  const handleDeleteCourse = () => {
    if (!courseToDelete) {
      return;
    }

    fetch(`${API_BASE_URL}/courses/${courseToDelete.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.detail || "Delete failed");
          });
        }

        return response.json();
      })
      .then(() => {
        closeDeleteModal();
        loadCourses();
      })
      .catch((error) => {
        setDeleteError(error.message);
      });
  };

  const categories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  const statuses = [
    ...new Set(courses.map((course) => course.status)),
  ];

  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  );

  const archivedCourses = courses.filter(
    (course) => course.status === "Archived"
  );

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter || course.category === categoryFilter;

    const matchesStatus =
      !statusFilter || course.status === statusFilter;

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
      <Table.Td>
        <Badge
          variant="light"
          color="petrol"
        >
          {course.code}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Text fw={600}>
          {course.name}
        </Text>

        <Text
          size="xs"
          c="dimmed"
        >
          {course.short_description}
        </Text>
      </Table.Td>

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
        <Group gap="xs">
          <Button
            component={Link}
            to={`/course-detail/${course.id}`}
            size="xs"
            variant="light"
            color="petrol"
            data-testid={`manage-course-${course.id}`}
          >
            View
          </Button>

          <Button
            size="xs"
            variant="light"
            data-testid={`edit-course-${course.id}`}
            onClick={() => openEditModal(course)}
          >
            Edit
          </Button>

          <Button
            size="xs"
            variant="light"
            color="red"
            data-testid={`delete-course-${course.id}`}
            onClick={() => openDeleteModal(course)}
          >
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Title order={1}>
            Course Management
          </Title>

          <Text c="dimmed">
            Create, edit and manage platform courses.
          </Text>
        </Stack>

        <Button
          color="petrol"
          data-testid="create-course-button"
          onClick={openCreateModal}
        >
          Create Course
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={4}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Total Courses
            </Text>

            <Title order={2}>
              {courses.length}
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Active Courses
            </Text>

            <Title order={2}>
              {activeCourses.length}
            </Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card
            withBorder
            radius="lg"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Archived Courses
            </Text>

            <Title order={2}>
              {archivedCourses.length}
            </Title>
          </Card>
        </Grid.Col>
      </Grid>

      <Paper
        p="lg"
        radius="lg"
        withBorder
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Search Courses"
                placeholder="Search by name or code..."
                value={search}
                data-testid="course-management-search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid.Col>

            <Grid.Col span={3}>
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
            </Grid.Col>

            <Grid.Col span={3}>
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
            </Grid.Col>
          </Grid>

          <Group justify="space-between">
            <Text
              fw={500}
              c="#0F172A"
            >
              {filteredCourses.length} courses found
            </Text>

            <Text
              size="sm"
              c="dimmed"
            >
              Manage catalog content used by learners.
            </Text>
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
        </Stack>
      </Paper>

      <Modal
        opened={courseModalOpened}
        onClose={() => {
          resetForm();
          setCourseModalOpened(false);
        }}
        title={selectedCourse ? "Edit Course" : "Create Course"}
        data-testid="course-form-modal"
        size="lg"
      >
        <Stack>
          {formError && (
            <Alert
              color="red"
              data-testid="course-form-error"
            >
              {formError}
            </Alert>
          )}

          <Grid>
            <Grid.Col span={4}>
              <TextInput
                label="Code"
                placeholder="Example: QA-401"
                value={code}
                data-testid="course-code-input"
                onChange={(e) => setCode(e.target.value)}
              />
            </Grid.Col>

            <Grid.Col span={8}>
              <TextInput
                label="Name"
                placeholder="Course name"
                value={name}
                data-testid="course-name-input"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Category"
                placeholder="Select category"
                data={[
                  "Automation",
                  "API Testing",
                  "Performance",
                  "Accessibility",
                  "AI for QA",
                  "Exploratory Testing",
                ]}
                value={category}
                data-testid="course-category-input"
                onChange={(value) => setCategory(value || "")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Level"
                placeholder="Select level"
                data={[
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ]}
                value={level}
                data-testid="course-level-input"
                onChange={(value) => setLevel(value || "")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Duration Hours"
                placeholder="Example: 8"
                value={durationHours}
                data-testid="course-duration-input"
                onChange={(e) =>
                  setDurationHours(e.target.value)
                }
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Status"
                data={[
                  "Active",
                  "Inactive",
                  "Archived",
                ]}
                value={status}
                data-testid="course-status-input"
                onChange={(value) =>
                  setStatus(value || "Active")
                }
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="Instructor"
                placeholder="Instructor name"
                value={instructor}
                data-testid="course-instructor-input"
                onChange={(e) =>
                  setInstructor(e.target.value)
                }
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="Short Description"
                placeholder="Short course summary"
                value={shortDescription}
                data-testid="course-short-description-input"
                onChange={(e) =>
                  setShortDescription(e.target.value)
                }
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Full course description"
                value={description}
                minRows={4}
                data-testid="course-description-input"
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => {
                resetForm();
                setCourseModalOpened(false);
              }}
            >
              Cancel
            </Button>

            <Button
              color="petrol"
              data-testid="save-course-button"
              onClick={handleSaveCourse}
            >
              {selectedCourse ? "Save Changes" : "Create"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Delete Course"
        data-testid="delete-course-modal"
      >
        <Stack>
          {deleteError && (
            <Alert
              color="red"
              data-testid="delete-course-error"
            >
              {deleteError}
            </Alert>
          )}

          <Text data-testid="delete-course-message">
            Are you sure you want to delete{" "}
            <strong>{courseToDelete?.name}</strong>?
          </Text>

          <Group justify="flex-end">
            <Button
              variant="default"
              data-testid="cancel-delete-course-button"
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>

            <Button
              color="red"
              data-testid="confirm-delete-course-button"
              onClick={handleDeleteCourse}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}