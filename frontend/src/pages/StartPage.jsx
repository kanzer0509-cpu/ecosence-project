import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <section className="start-page">
      <div className="start-card">
        <h1>EcoSense</h1>
        <p>환경 모니터링 IoT 대시보드</p>

        <button type="button" onClick={() => navigate('/login')}>
          로그인
        </button>

        <button type="button" onClick={() => navigate('/main')}>
          비회원으로 시작
        </button>
      </div>
    </section>
  );
}