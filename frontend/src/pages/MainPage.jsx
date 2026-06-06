import { useNavigate } from 'react-router-dom';
import './MainPage.css';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <section className="main-page">
      <div className="main-card">

        <img
          src="/images/logo.png"
          alt="EcoSense"
          className="main-logo"
        />

        <div className="main-menu-grid">

          <button
            className="menu-image-button"
            onClick={() => navigate('/outdoor')}
          >
            <img src="/images/outdoor.png" alt="실외" />
          </button>

          <button
            className="menu-image-button"
            onClick={() => navigate('/indoor')}
          >
            <img src="/images/indoor.png" alt="실내" />
          </button>

          <button
            className="menu-image-button menu-settings"
            onClick={() => navigate('/settings')}
          >
            <img src="/images/settings.png" alt="설정" />
          </button>

          <button
            className="menu-image-button"
            onClick={() => navigate('/sleep')}
          >
            <img src="/images/sleep.png" alt="수면/소음" />
          </button>

          <button
            className="menu-image-button"
            onClick={() => navigate('/reports')}
          >
            <img src="/images/report.png" alt="보고서" />
          </button>

        </div>
      </div>
    </section>
  );
}