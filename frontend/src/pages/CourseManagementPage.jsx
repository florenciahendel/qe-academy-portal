import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function CourseManagementPage() {
  return (
    <AppCard  >
      <PageHeader
        title="Course Management"
        subtitle="Course administration module."
      />

      <ul data-testid="course-management-features">
        <li>Create courses</li>
        <li>Edit courses</li>
        <li>Archive courses</li>
      </ul>
    </AppCard>
  );
}