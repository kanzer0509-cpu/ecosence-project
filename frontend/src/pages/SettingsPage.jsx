import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../stores/useAuthStore';
import { useOutdoorStore } from '../stores/useOutdoorStore';
import { getLocalSyncData } from '../services/indexedDB';
import { uploadSyncData } from '../services/sync';

export default function SettingsPage() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuthStore();
  const { location } = useOutdoorStore();

  const handleSyncUpload = async () => {
    try {
      const data = await getLocalSyncData();
      const result = await uploadSyncData(data);

      console.log('동기화 결과:', result);
      alert('로컬 데이터 동기화가 완료되었습니다.');
    } catch (error) {
      console.error('동기화 실패:', error);
      alert('동기화에 실패했습니다.');
    }
  };

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

            <button type="button" onClick={handleSyncUpload}>
              로컬 데이터 동기화
            </button>

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
              <button type="button" onClick={() => navigate('/login')}>
                로그인
              </button>

              <button type="button" onClick={() => navigate('/register')}>
                회원가입
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}