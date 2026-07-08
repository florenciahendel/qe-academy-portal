import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function CoursesPage() {
  return (
    <AppCard>
      <PageHeader
        title="Course Catalog"
        subtitle="Training catalog for automation exercises."
      />

      <ul data-testid="course-catalog-features">
        <li>Course search</li>
        <li>Course filters</li>
        <li>Course detail navigation</li>
      </ul>
    </AppCard>
  );
}