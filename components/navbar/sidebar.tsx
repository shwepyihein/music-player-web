import { Home, Menu, Music, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const navigation = [
  { name: 'Home', href: '#', icon: Home, current: true },
  { name: 'Explore', href: '#', icon: Users, current: false },
  { name: 'Library', href: '#', icon: Music, current: false },
];

const Sidebar = () => {
  return (
    <div className="w-[--ytmusic-guide-width] z-[2] fixed top-0 left-0 h-screen border-r border-[--ytmusic-border]">
      <div className="pl-4 h-[--ytmusic-nav-bar-height] gap-5 flex items-center flex-shrink-0  ">
        <Menu size={24} />
        <p>Logo</p>
      </div>
      <ul
        role="list"
        className="mt-[--ytmusic-nav-bar-height] w-[--ytmusic-guide-width] px-3   pt-3 pb-[120px] w- fixed top-0 "
      >
        <div className="w-full space-y-3">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={twMerge(
                  item.current
                    ? 'bg-[--hover] text-white'
                    : 'text-indigo-200 hover:text-white hover:bg-[--hover]',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}
              >
                <item.icon
                  className={twMerge(
                    item.current
                      ? 'text-white'
                      : 'text-indigo-200 group-hover:text-white',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
