import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../services/auth';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register({ email, password });
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
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

        <button type="button" onClick={handleRegister}>
          회원가입
        </button>

        <button type="button" onClick={() => navigate('/login')}>
          로그인 하러가기
        </button>
      </div>
    </section>
  );
}