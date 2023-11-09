'use client';

import {
  Command,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 64) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);
  return (
    <div
      className={twMerge(
        show
          ? ' border-b border-[--ytmusic-border] bg-black'
          : '  bg-[transparent] ',
        'fixed w-full top-0 left-0 z-[5]'
      )}
    >
      <div className="flex flex-start items-center h-[--ytmusic-nav-bar-height]">
        <div className="pl-4 gap-5 flex items-center flex-shrink-0  w-[--ytmusic-guide-width]">
          <Menu size={24} />
          <p>Logo</p>
        </div>

        <div className="w-full pl-20 ">
          <Command className="max-w-[400px] border-1 border-white">
            <CommandInput placeholder="Search songs, albums, artists, podcasts" />
            <CommandList>
              {/* <CommandEmpty>No results found.</CommandEmpty> */}

              {/* <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem> */}

              <CommandSeparator />
            </CommandList>
          </Command>
        </div>
        <div className="w-[--ytmusic-nav-bar-width]"></div>
      </div>
    </div>
  );
};

export default Navbar;
