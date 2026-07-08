import PageHeader from "../components/shared/PageHeader";
import AppCard from "../components/shared/AppCard";

export default function NotFoundPage() {
  return (
    <AppCard>
      <PageHeader
        title="404"
        subtitle="Page not found."
      />

      <p data-testid="not-found-message">
        The requested page does not exist.
      </p>
    </AppCard>
  );
}