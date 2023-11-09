import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { AspectRatio } from '../ui/aspect-ratio';
import { Separator } from '../ui/separator';

const DetailSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <div className="flex  items-center gap-5">
          <div className="relative w-10 h-10 overflow-hidden rounded-xs">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={
                  'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80'
                }
                alt={'123'}
                width={36}
                height={36}
                className={cn(
                  'h-auto w-auto object-cover transition-all hover:scale-105'
                )}
              />
            </AspectRatio>
          </div>
          <div>
            <p className="text-md">
              去有風的地方 (電視劇《去有風的地方》主題曲)
            </p>
            <p className="text-sm text-gray-200/50">
              去有風的地方 (電視劇《去有風的地方》主題曲) .2023
            </p>
          </div>
        </div>
      </SheetTrigger>
      <div className="flex ml-5 items-center gap-5">
        {/* <ThumbsUp size={20} />
        <ThumbsDown size={20} /> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[--music-bar-color]">
            <DropdownMenuLabel>Add to Favoriote</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <SheetContent
        className="bg-black h-screen ml-[--ytmusic-guide-width] pt-[--ytmusic-nav-bar-height] pb-40"
        side={'bottom'}
      >
        <div className="grid grid-cols-12 max-w-[--ytmusic-content-width] mx-auto w-full h-full gap-5">
          <div className="relative max-w-[800px] max-h-[--music-photo-height] mt-20  col-span-6  rounded-xs">
            <Image
              src={
                'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80'
              }
              alt={'123'}
              fill
              className={cn('h-auto w-auto object-cover ')}
            />
          </div>
          <div className="col-span-6 flex  justify-center mt-20">
            <div>
              <div className="">
                <div className="space-y-1">
                  <p className="text-md">
                    去有風的地方 (電視劇《去有風的地方》主題曲)
                  </p>
                  <p className="text-sm text-gray-200/50">
                    去有風的地方 (電視劇《去有風的地方》主題曲) .2023
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div>Up Next</div>
                <Separator />
                {[1, 2, 3, 4].map((item, i) => (
                  <div
                    key={i}
                    className={twMerge(
                      i == 0 && 'bg-[--music-bar-color]',
                      'flex justify-between p-2 rounded-sm   items-center gap-5'
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative  w-10 h-10 overflow-hidden rounded-xs">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={
                              'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80'
                            }
                            alt={'123'}
                            width={36}
                            height={36}
                            className={cn(
                              'h-auto w-auto object-cover transition-all hover:scale-105'
                            )}
                          />
                        </AspectRatio>
                      </div>
                      <div className="max-w-[150px]">
                        <p className="text-md truncate">
                          去有風的地方 (電視劇《去有風的地方》主題曲)
                        </p>
                        <p className="text-sm truncate text-gray-200/50">
                          去有風的地方 (電視劇《去有風的地方》主題曲) .2023
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[--music-bar-color]">
                        <DropdownMenuLabel>Add to Favoriote</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailSheet;
