import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Badge } from "@mantine/core";

import AppCard from "../components/shared/AppCard";
import PageHeader from "../components/shared/PageHeader";

export default function UserDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <AppCard>
        <PageHeader
          title="Loading..."
          subtitle="Fetching user information."
        />
      </AppCard>
    );
  }

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
        title={`${user.first_name} ${user.last_name}`}
        subtitle="User details"
      />

      <p data-testid="user-detail-email">
        Email: {user.email}
      </p>

      <p data-testid="user-detail-role">
        Role: {user.role}
      </p>

      <Badge
        color={
          user.status === "Active"
            ? "green"
            : "yellow"
        }
        data-testid="user-detail-status"
      >
        {user.status}
      </Badge>
    </AppCard>
  );
}