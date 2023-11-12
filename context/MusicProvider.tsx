'use client';
import { useEffect, useState } from 'react';

import { MusicContext } from './MusicContext';

declare global {
  namespace YT {
    enum PlayerState {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5,
    }

    interface Player {
      // Add any additional methods or properties you use in your component
      getCurrentTime(): number;
      getDuration(): number;
      pauseVideo(): void;
      playVideo(): void;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      setVolume(volume: number): void;
    }
  }
}

export {};

const MusicProvider = ({ children }: any) => {
  const [player, setPlayer] = useState<any>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [loading, setLoading] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioTracks = [
    {
      id: 1,
      videoId: 'Z7HboSMVnEI',
      // ... other data
    },
    {
      id: 2,
      videoId: 'KFId4UVOyy8',
      // ... other data
    },
    {
      id: 2,
      videoId: 'KFId4UVOyy8',
      // ... other data
    },
    // Add more tracks as needed
  ];

  const getCurrentTrack = () => {
    return audioTracks[currentTrackIndex];
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    event.target.setVolume(volume);
    setLoading(false);
  };

  const onStateChange = (event: any) => {
    setCurrentTime(event.target.getCurrentTime());
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const onProgressChange = (e: any) => {
    const newTime = (e.target.value * duration) / 100;
    setCurrentTime(newTime);
    player.seekTo(newTime, true);
  };

  const onVolumeChange = (e: any) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    player.setVolume(newVolume);
  };

  const handleNextTrack = () => {
    setLoading(true);
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioTracks.length);
  };

  const handlePrevTrack = () => {
    setLoading(true);
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + audioTracks.length) % audioTracks.length
    );
  };

  useEffect(() => {
    setLoading(true);
  }, [currentTrackIndex]);

  useEffect(() => {
    if (player) {
      setCurrentTime(player.getCurrentTime());
    }
  }, [player]);

  return (
    <MusicContext.Provider
      value={{
        player,
        currentTime,
        getCurrentTrack,
        onReady,
        setDuration,
        setVolume,
        volume,
        loading,
        togglePlayPause,
        onStateChange,
        onProgressChange,
        onVolumeChange,
        handleNextTrack,
        handlePrevTrack,
        duration,
        isPlaying,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export { MusicProvider };
