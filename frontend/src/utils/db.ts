export const getDbComment = (db: number | null) => {
  if (db === null) return '마이크 권한 허용 후 실시간 소음이 표시됩니다.';

  if (db < 40) return '매우 조용한 환경입니다.';
  if (db < 60) return '일상적인 실내 소음 수준입니다.';
  if (db < 70) return '약간 시끄러울 수 있습니다.';
  if (db < 85) return '장시간 노출 시 피로감을 줄 수 있습니다.';
  if (db < 100) return '소음이 큽니다. 주의가 필요합니다.';

  return '매우 큰 소음입니다. 단시간 노출도 주의하세요.';
};