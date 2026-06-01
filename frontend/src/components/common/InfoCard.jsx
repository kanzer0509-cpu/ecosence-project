export default function InfoCard({ title, value, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <strong>{value}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}