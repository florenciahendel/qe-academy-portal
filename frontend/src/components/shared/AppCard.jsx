import { Paper } from "@mantine/core";

export default function AppCard({
  children,
}) {
  return (
    <Paper
      shadow="sm"
      radius="md"
      p="lg"
      withBorder
      data-testid="app-card"
    >
      {children}
    </Paper>
  );
}