import { useRef } from 'react';
import { saveRecording, saveSpike } from '../services/indexedDB';
import { useNoiseStore } from '../stores/useNoiseStore';

export const useAudio = () => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const isRecordingRef = useRef(false);

  const lastSpikeTimeRef = useRef(0);
  const lastGraphUpdateRef = useRef(0);

  const { startMeasuring, stopMeasuring, setCurrentDb, addSpike } =
    useNoiseStore();

  const startSpikeRecording = (spike) => {
    if (!mediaStreamRef.current || isRecordingRef.current) return;

    recordedChunksRef.current = [];

    const recorder = new MediaRecorder(mediaStreamRef.current);
    mediaRecorderRef.current = recorder;
    isRecordingRef.current = true;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(recordedChunksRef.current, {
        type: 'audio/webm',
      });

      const recording = {
        spikeId: spike.createdAt,
        timestamp: spike.timestamp,
        db: spike.db,
        blob,
        durationSec: 10,
        createdAt: new Date().toISOString(),
      };

      try {
        await saveRecording(recording);
        console.log('녹음 저장 완료:', recording);
      } catch (error) {
        console.error('녹음 저장 실패:', error);
      } finally {
        recordedChunksRef.current = [];
        isRecordingRef.current = false;
      }
    };

    recorder.start();

    setTimeout(() => {
      if (recorder.state !== 'inactive') {
        recorder.stop();
      }
    }, 10000);
  };

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;

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

          startSpikeRecording(spike);
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

    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());

    audioContextRef.current?.close();

    audioContextRef.current = null;
    analyserRef.current = null;
    animationFrameRef.current = null;
    mediaStreamRef.current = null;
    mediaRecorderRef.current = null;
    isRecordingRef.current = false;

    stopMeasuring();
  };

  return {
    startAudio,
    stopAudio,
  };
};