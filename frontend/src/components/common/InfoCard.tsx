interface InfoCardProps {
  title: string;
  value: string;
  description?: string;
}

export default function InfoCard({ title, value, description }: InfoCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <strong>{value}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}