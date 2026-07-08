import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AppCard>
      <PageHeader
        title="Dashboard"
        subtitle="Main entry point after login."
      />

      <p data-testid="current-user">
        User: {user?.firstName} {user?.lastName}
      </p>

      <p data-testid="current-role">
        Role: {user?.role}
      </p>

      <p data-testid="current-status">
        Status: {user?.status}
      </p>
    </AppCard>
  );
}