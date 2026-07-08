export default function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div data-testid="page-header">
      <h1 data-testid="page-title">
        {title}
      </h1>

      {subtitle && (
        <p data-testid="page-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}