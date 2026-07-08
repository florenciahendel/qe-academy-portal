import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function MyCoursesPage() {
  return (
    <AppCard >
      <PageHeader
        title="My Courses"
        subtitle="Student enrollments."
      />

      <ul data-testid="my-courses-statuses">
        <li>Active enrollments</li>
        <li>Cancelled enrollments</li>
        <li>Completed enrollments</li>
      </ul>
    </AppCard>
  );
}