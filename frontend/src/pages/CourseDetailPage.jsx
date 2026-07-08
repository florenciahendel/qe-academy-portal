import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function CourseDetailPage() {
  return (
    <AppCard>
      <PageHeader
        title="Course Detail"
        subtitle="Detailed course information."
      />

      <ul data-testid="course-detail-fields">
        <li>Description</li>
        <li>Category</li>
        <li>Duration</li>
        <li>Level</li>
      </ul>
    </AppCard>
  );
}