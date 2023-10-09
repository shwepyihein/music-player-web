'use client';

import {
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Slider } from '../ui/slider';
import DetailSheet from './detail-sheet';

const MusicPlayer = () => {
  return (
    <div
      className={twMerge(
        'border-t fixed border-[--ytmusic-border]  bg-black  w-full bottom-0 left-0 z-[51]'
      )}
    >
      <div className="relative">
        <Slider defaultValue={[33]} max={100} step={1} />

        <div className="flex-start flex bg-[--music-bar-color] items-center h-[--ytmusic-bar-height]">
          <div className="px-4 gap-5 flex justify-between items-center flex-shrink-0  w-[--ytmusic-guide-width]">
            <div>
              <SkipBack fill="#fff" size={16} />
            </div>
            <div>
              <Play fill="#fff" size={28} />
            </div>
            <div>
              <SkipForward fill="#fff" size={16} />
            </div>
            <div>
              <p className="text-gray-100/40  text-[12px]">0:01 /3:52</p>
            </div>
          </div>

          <div className="max-w-[900px] flex items-center mx-auto  h-[--ytmusic-bar-height]  ">
            <DetailSheet />
          </div>
          <div className="w-[--ytmusic-guide-width]">
            <div className="grid grid-cols-7 items-center">
              <div className="w-full col-span-2">
                <Slider defaultValue={[100]} max={100} step={1} />
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
                <div className=" rotate-90">
                  <Play fill="#fff" size={16} />
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
