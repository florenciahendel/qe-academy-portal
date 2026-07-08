import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard"; 

export default function UserManagementPage() {
  return (
    <AppCard>
      <PageHeader
        title="User Management"
        subtitle="Administration module."
      />

      <ul data-testid="user-management-features">
        <li>Create users</li>
        <li>Edit users</li>
        <li>Deactivate users</li>
      </ul>
    </AppCard>
  );
}