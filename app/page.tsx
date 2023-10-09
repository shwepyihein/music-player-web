import { AlbumArtwork } from '@/components/album-network';
import MusicPlayer from '@/components/music-player';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/navbar/sidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { madeForYouAlbums } from '@/lib/data';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <MusicPlayer />
      <div className="ml-[--ytmusic-guide-width] pt-[--ytmusic-nav-bar-height] pb-40">
        <div className="w-full py-5">
          <div className="max-w-[--ytmusic-content-width] mx-auto">
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Made for You
              </h2>
              <p className="text-sm text-muted-foreground">
                Your personal playlists. Updated daily.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {madeForYouAlbums.map((album) => (
                    <AlbumArtwork
                      key={album.name}
                      album={album}
                      className="w-[150px]"
                      width={150}
                      height={150}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="w-full py-5">
          <div className="max-w-[--ytmusic-content-width] mx-auto">
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Listen Again
              </h2>
              <p className="text-sm text-muted-foreground">
                Your personal playlists. Updated daily.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="grid lg:grid-cols-7  gap-[--ytmusic-grid-renderer-grid-gap] pb-4">
                  {madeForYouAlbums.map((album) => (
                    <AlbumArtwork
                      key={album.name}
                      album={album}
                      className="w-[150px]"
                      width={150}
                      height={150}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
