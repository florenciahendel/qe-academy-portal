import { useParams } from "react-router-dom";
import { Badge } from "@mantine/core";

import AppCard from "../components/shared/AppCard";
import PageHeader from "../components/shared/PageHeader";

import { users } from "../data/users";

export default function UserDetailPage() {
  const { id } = useParams();

  const user = users.find((user) => user.id === id);

  if (!user) {
    return (
      <AppCard>
        <PageHeader
          title="User Not Found"
          subtitle="The requested user does not exist."
        />
      </AppCard>
    );
  }

  return (
    <AppCard>
      <PageHeader
        title={`${user.firstName} ${user.lastName}`}
        subtitle="User details"
      />

      <p data-testid="user-detail-email">Email: {user.email}</p>

      <p data-testid="user-detail-role">Role: {user.role}</p>

      <Badge
        color={user.status === "Active" ? "green" : "yellow"}
        data-testid="user-detail-status"
      >
        {user.status}
      </Badge>
    </AppCard>
  );
}
