import InfoCard from '../components/common/InfoCard';

export default function OutdoorPage() {
  return (
    <section>
      <h2>실외 대시보드</h2>

      <div>
        <input placeholder="지역을 입력하세요 예: 창원" />
        <button>현재 위치 사용</button>
        <button>새로고침</button>
      </div>

      <div>
        <InfoCard title="기온" value="24℃" description="쾌적한 기온입니다." />
        <InfoCard title="습도" value="55%" description="적정 습도입니다." />
        <InfoCard title="강수량" value="0mm" description="비 예보가 없습니다." />
        <InfoCard title="UV" value="보통" description="장시간 외출 시 주의하세요." />
        <InfoCard title="AQI" value="좋음" description="마스크 없이 활동 가능합니다." />
      </div>

      <div>
        <h3>실외 환경 변화 그래프</h3>
        <p>그래프 영역</p>
      </div>
    </section>
  );
}