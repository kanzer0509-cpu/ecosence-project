import { useRef } from 'react';
import { saveSpike } from '../services/indexedDB';
import { useNoiseStore } from '../stores/useNoiseStore';

export const useAudio = () => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastSpikeTimeRef = useRef(0);
  const lastGraphUpdateRef = useRef(0);

  const { startMeasuring, stopMeasuring, setCurrentDb, addSpike } =
    useNoiseStore();

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      startMeasuring();

      const dataArray = new Float32Array(analyser.fftSize);

      const measure = () => {
        analyser.getFloatTimeDomainData(dataArray);

        let sum = 0;
        let peak = 0;

        for (const value of dataArray) {
          sum += value * value;
          peak = Math.max(peak, Math.abs(value));
        }

        const rms = Math.sqrt(sum / dataArray.length);
        const relativeDb = 20 * Math.log10(rms || 0.00001);

        const currentDb = Math.max(0, Math.min(100, relativeDb + 100));

        const now = Date.now();

        if (now - lastGraphUpdateRef.current > 200) {
          setCurrentDb(currentDb);
          lastGraphUpdateRef.current = now;
        }

        const isSpike = currentDb >= 70 || peak >= 0.35;
        const canSaveSpike = now - lastSpikeTimeRef.current > 2000;

        if (isSpike && canSaveSpike) {
          lastSpikeTimeRef.current = now;

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