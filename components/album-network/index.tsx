import Image from 'next/image';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { playlists } from '@/lib/playlist';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: any;
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const path = process.env.NEXT_PUBLIC_IMAGE_PATH;
  return (
    <div className={cn('space-y-3 cursor-pointer', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative w-[250px] h-[200px] overflow-hidden rounded-md">
            <Image
              src={`${path}/${album?.image_path}`}
              alt={album.title}
              width={width}
              height={height}
              className={cn(
                ' object-cover transition-all hover:scale-105',

                'aspect-square'
              )}
            />

            <div className="absolute hover:bg-[--ytmusic-background-overlay-background] w-full h-full flex justify-center items-center top-0 left-0">
              <Play size={24} fill="#fff" />
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>New Playlist</ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album?.title}</h3>
        <p className="text-xs text-muted-foreground">
          {album?.author_id?.name}
        </p>
      </div>
    </div>
  );
}
