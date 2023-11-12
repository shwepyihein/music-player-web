'use client';
import { AlbumArtwork } from '@/components/album-network';
import MusicPlayer from '@/components/music-player';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/navbar/sidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function Main({ playList, audioRandom }: any) {
  console.log(playList, audioRandom);
  return (
    <div>
      <Navbar />
      <Sidebar />
      <MusicPlayer />
      <div className="ml-[--ytmusic-guide-width] pt-[--ytmusic-nav-bar-height] pb-40">
        {playList?.data?.map((pl: any, idx: number) => (
          <div key={idx} className="w-full py-5">
            <div className="max-w-[--ytmusic-content-width] mx-auto">
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {pl.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your personal playlists. Updated daily.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {pl.audioList.map((album: any, idx: number) => (
                      <AlbumArtwork
                        key={idx}
                        album={album}
                        width={500}
                        height={200}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full py-5">
          <div className="max-w-[--ytmusic-content-width] mx-auto">
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                All Audio
              </h2>
              <p className="text-sm text-muted-foreground">Find your Audio</p>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-4 gap-x-10 gap-y-10 pb-4">
              {audioRandom &&
                audioRandom?.map((album: any, idx: number) => (
                  <AlbumArtwork
                    key={idx}
                    album={album}
                    width={500}
                    height={200}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
