import { useRef } from 'react';
import { useNoiseStore } from '../stores/useNoiseStore';
import { saveSpike } from '../services/indexedDB';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const {
    startMeasuring,
    stopMeasuring,
    setCurrentDb,
    addSpike,
  } = useNoiseStore();

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      startMeasuring();

      const dataArray = new Uint8Array(analyser.fftSize);

      const measure = () => {
        analyser.getByteTimeDomainData(dataArray);

        let sum = 0;

        for (const value of dataArray) {
          const normalized = (value - 128) / 128;
          sum += normalized * normalized;
        }

        const rms = Math.sqrt(sum / dataArray.length);
        const db = 20 * Math.log10(rms || 0.00001) + 100;
        const currentDb = Math.max(0, db);

        setCurrentDb(currentDb);

        if (currentDb >= 70) {
            const spike = {
                timestamp: new Date().toLocaleTimeString(),
                db: Number(currentDb.toFixed(1)),
                createdAt: new Date().toISOString(),
            };

            addSpike(spike);
            saveSpike(spike).catch((error) => {
                console.error('스파이크 저장 실패:', error);
            });
        }
        animationFrameRef.current = requestAnimationFrame(measure);
      };

      measure();
    } catch (error) {
      console.error('마이크 접근 실패:', error);
      alert('마이크 권한을 허용해야 소음 측정을 사용할 수 있습니다.');
    }
  };

  const stopAudio = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    audioContextRef.current?.close();

    audioContextRef.current = null;
    analyserRef.current = null;
    animationFrameRef.current = null;

    stopMeasuring();
  };

  return {
    startAudio,
    stopAudio,
  };
};