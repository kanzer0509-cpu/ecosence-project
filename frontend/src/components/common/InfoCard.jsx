const iconMap = {
  기온: '🌡️',
  체감온도: '🧥',
  습도: '💧',
  'PM2.5': '🌫️',
  PM10: '🌫️',
  AQI: '🍃',
  UV: '☀️',
  강수량: '🌧️',
  '실내 온도': '🏠',
  '실내 습도': '💧',
  '현재 소음': '🔊',
};

export default function InfoCard({ title, value, description }) {
  const icon = iconMap[title] ?? '📌';

  return (
    <div className="info-card">
      <div className="info-card-main">
        <div className="info-card-content">
          <div className="info-card-header">
            <span className="info-card-icon">{icon}</span>
            <h3>{title}</h3>
          </div>

          <strong>{value}</strong>

          {description && (
            <p className="info-card-description">{description}</p>
          )}
        </div>

        <div className="info-card-badge">{icon}</div>
      </div>
    </div>
  );
}