'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MusicContext } from './MusicContext';

const MusicProvider = ({ children }: any) => {
  const audioRef: any = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const progressBarRef: any = useRef();
  const playAnimationRef: any = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState('/test.mp3');

  const [volume, setVolume] = useState(60);

  const UpdateTrack = () => {};

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        UpdateTrack,
        isPlaying,
        togglePlayPause,
        timeProgress,
        duration,
        audioRef,
        handleProgressChange,
        progressBarRef,
        setDuration,
        setVolume,
        volume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export { MusicProvider };
