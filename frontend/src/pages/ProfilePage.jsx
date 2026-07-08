import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AppCard>
      <PageHeader
        title="Profile"
        subtitle="Current logged user information."
      />

      <p data-testid="profile-first-name">
        First Name: {user?.firstName}
      </p>

      <p data-testid="profile-last-name">
        Last Name: {user?.lastName}
      </p>

      <p data-testid="profile-email">
        Email: {user?.email}
      </p>

      <p data-testid="profile-role">
        Role: {user?.role}
      </p>

      <p data-testid="profile-status">
        Status: {user?.status}
      </p>
    </AppCard>
  );
}
