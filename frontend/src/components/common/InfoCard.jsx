export default function InfoCard({ title, value, description }) {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      <strong>{value}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}