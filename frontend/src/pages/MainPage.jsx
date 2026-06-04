import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <section className="main-page">
      <div className="main-card">
        <h1>EcoSense</h1>

        <div className="main-menu-grid">
          <button type="button" onClick={() => navigate('/outdoor')}>
            실외
          </button>

          <button type="button" onClick={() => navigate('/indoor')}>
            실내
          </button>

          <button type="button" onClick={() => navigate('/settings')}>
            설정
          </button>

          <button type="button" onClick={() => navigate('/sleep')}>
            수면/소음
          </button>

          <button type="button" onClick={() => navigate('/reports')}>
            보고서
          </button>
        </div>
      </div>
    </section>
  );
}