import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function DashboardPage() {
  return (
    <AppCard>
      <PageHeader
        title="Dashboard"
        subtitle="Main entry point after login."
      />

      <ul data-testid="dashboard-features">
        <li>Quick navigation</li>
        <li>User summary</li>
        <li>Role information</li>
      </ul>
    </AppCard>
  );
}