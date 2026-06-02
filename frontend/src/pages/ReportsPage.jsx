import { useEffect, useState } from 'react';

import { downloadReport, getReportHistory } from '../services/report';

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getReportHistory();
        setHistory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('보고서 이력 조회 실패:', error);
      }
    };

    loadHistory();
  }, []);

  const handleDownload = async (period) => {
    try {
      setIsLoading(true);

      const blob = await downloadReport(period);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download =
        period === 'weekly'
          ? 'ecosense-weekly-report.pdf'
          : 'ecosense-monthly-report.pdf';

      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('보고서 다운로드 실패:', error);
      alert('보고서를 다운로드하지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2>보고서</h2>

      <p>주간 또는 월간 환경 데이터를 PDF 보고서로 다운로드합니다.</p>

      <div>
        <button
          type="button"
          onClick={() => handleDownload('weekly')}
          disabled={isLoading}
        >
          주간 보고서 다운로드
        </button>

        <button
          type="button"
          onClick={() => handleDownload('monthly')}
          disabled={isLoading}
        >
          월간 보고서 다운로드
        </button>
      </div>

      {isLoading && <p>보고서를 생성하는 중입니다...</p>}

      <div>
        <h3>보고서 생성 이력</h3>

        {history.length === 0 ? (
          <p>아직 생성된 보고서 이력이 없습니다.</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={item.id ?? index}>
                {item.period ?? '기간 정보 없음'} -{' '}
                {item.created_at ?? item.createdAt ?? '생성일 정보 없음'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}