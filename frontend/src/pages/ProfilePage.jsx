import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function ProfilePage() {
  return (
    <AppCard>
      <PageHeader
        title="Profile"
        subtitle="User information."
      />

      <ul data-testid="profile-fields">
        <li>Name</li>
        <li>Email</li>
        <li>Role</li>
        <li>Status</li>
      </ul>
    </AppCard>
  );
}