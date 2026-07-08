import { Container } from "@mantine/core";

export default function AppContainer({
  children,
}) {
  return (
    <Container
      size="lg"
      py="md"
      data-testid="app-container"
    >
      {children}
    </Container>
  );
}