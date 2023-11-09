'use client';

import { useMusic } from '@/context/MusicContext';
import { formatTime } from '@/lib/utils';
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import DetailSheet from './detail-sheet';
import DisplayTrack from './display';

const MusicPlayer = () => {
  const {
    handleProgressChange,
    progressBarRef,
    togglePlayPause,
    currentTrack,
    timeProgress,
    duration,
    isPlaying,
    audioRef,
    setDuration,
    volume,
    setVolume,
  } = useMusic();
  if (!currentTrack) {
    return null;
  }
  return (
    <div
      className={twMerge(
        'border-t fixed border-[--ytmusic-border]  bg-black  w-full bottom-0 left-0 z-[51]'
      )}
    >
      <div className="relative">
        <input
          type="range"
          className="bg-white  py-0 w-full"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />

        <div className="flex-start flex bg-[--music-bar-color] items-center h-[--ytmusic-bar-height]">
          <div className="px-4 gap-5 flex justify-between items-center flex-shrink-0  w-[--ytmusic-guide-width]">
            <div>
              <SkipBack fill="#fff" size={16} />
            </div>
            <div>
              {!isPlaying ? (
                <Play onClick={togglePlayPause} fill="#fff" size={16} />
              ) : (
                <Pause onClick={togglePlayPause} fill="#fff" size={16} />
              )}
            </div>
            <div>
              <SkipForward fill="#fff" size={16} />
            </div>

            <div>
              <p className="text-gray-100/40  text-[12px]">
                {formatTime(timeProgress)}/{formatTime(duration)}
              </p>
            </div>
          </div>
          <div className="w-[200px] h-[200px] ">
            <DisplayTrack
              currentTrack={currentTrack}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              setDuration={setDuration}
            />
          </div>

          <div className="max-w-[900px] flex items-center mx-auto  h-[--ytmusic-bar-height]  ">
            <DetailSheet />
          </div>

          <div className="w-[--ytmusic-guide-width]">
            <div className="grid grid-cols-7 items-center">
              <div className="w-full flex items-center col-span-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  style={{
                    background: `linear-gradient(to right, #fff ${volume}%, #ccc ${volume}%)`,
                  }}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
              <div className="px-4 gap-5 col-span-5 flex  justify-end items-center flex-shrink-0">
                <div>
                  <Volume2 fill="#fff" size={18} />
                </div>
                <div>
                  <Repeat fill="#fff" size={18} />
                </div>
                <div>
                  <Shuffle fill="#fff" size={18} />
                </div>
                <div className="rotate-90">
                  {isPlaying ? (
                    <Play onClick={togglePlayPause} fill="#fff" size={16} />
                  ) : (
                    <Pause fill="#fff" size={16} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
