import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../services/auth';
import { useAuthStore } from '../stores/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: setLogin } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login({ email, password });
      setLogin({ email });
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>EcoSense</h1>

        <label>
          이메일
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일"
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
          />
        </label>

        <button type="button" onClick={handleLogin}>
          로그인
        </button>

        <button type="button" onClick={() => navigate('/main')}>
          비회원으로 시작
        </button>
      </div>
    </section>
  );
}