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
import YouTube from 'react-youtube';
import { twMerge } from 'tailwind-merge';
import DetailSheet from './detail-sheet';

const MusicPlayer = () => {
  const {
    handlePrevTrack,
    handleNextTrack,
    togglePlayPause,
    currentTime,
    onStateChange,
    duration,
    isPlaying,
    onProgressChange,
    onReady,
    volume,
    onVolumeChange,
    currentTrack,
    getCurrentTrack,
    loading,
  } = useMusic();
  // if (!currentTrack) {
  //   return null;
  // }

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
          min="0"
          max="100"
          step="1"
          value={(currentTime / duration) * 100 || 0}
          onChange={onProgressChange}
        />

        <div className="flex-start flex bg-[--music-bar-color] items-center h-[--ytmusic-bar-height]">
          <div className="px-4 gap-5 flex justify-between items-center flex-shrink-0  w-[--ytmusic-guide-width]">
            {loading ? (
              <div>loading</div>
            ) : (
              <>
                <div className="cursor-pointer" onCanPlay={handlePrevTrack}>
                  <SkipBack fill="#fff" size={16} />
                </div>
                <div>
                  {!isPlaying ? (
                    <Play onClick={togglePlayPause} fill="#fff" size={16} />
                  ) : (
                    <Pause onClick={togglePlayPause} fill="#fff" size={16} />
                  )}
                </div>
                <div className="cursor-pointer" onClick={handleNextTrack}>
                  <SkipForward fill="#fff" size={16} />
                </div>
              </>
            )}

            <div>
              <p className="text-gray-100/40  text-[12px]">
                {formatTime(currentTime)}/{formatTime(duration)}
              </p>
            </div>
          </div>

          <YouTube
            className="hidden"
            style={{ width: 0, height: 0 }}
            videoId={getCurrentTrack().videoId}
            opts={{ height: '390', width: '640' }}
            onReady={onReady}
            onStateChange={onStateChange}
          />

          <div className="max-w-[900px] flex items-center mx-auto  h-[--ytmusic-bar-height]  ">
            <DetailSheet />
          </div>

          <div className="w-[--ytmusic-guide-width]">
            <div className="grid grid-cols-7 items-center">
              <div className="w-full flex items-center col-span-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={volume}
                  style={{
                    background: `linear-gradient(to right, #fff ${volume}%, #ccc ${volume}%)`,
                  }}
                  onChange={onVolumeChange}
                />
                <p>{volume} %</p>
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
