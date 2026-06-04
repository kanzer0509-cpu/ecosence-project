import { useAuthStore } from '../stores/useAuthStore';
import { useOutdoorStore } from '../stores/useOutdoorStore';

export default function SettingsPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { location } = useOutdoorStore();

  return (
    <section className="settings-page">
      <div className="settings-card">
        <h2>설정</h2>

        {isAuthenticated ? (
          <>
            <div className="setting-item">
              <h3>계정 정보</h3>
              <p>{user?.email ?? '이메일 정보 없음'}</p>
            </div>

            <div className="setting-item">
              <h3>현재 지역</h3>
              <p>{location}</p>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={logout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <div className="setting-item">
              <h3>비회원 모드</h3>
              <p>현재 비회원으로 사용 중입니다.</p>
            </div>

            <div className="guest-actions">
              <button type="button">로그인</button>
              <button type="button">회원가입</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}