import PageHeader from "../components/shared/PageHeader";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
      }}
    >
      <PageHeader
        title="QE Academy Portal"
        subtitle="Playwright Training Environment"
      />

      <LoginForm />
    </div>
  );
}