import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex py-5 gap-5 items-center  border-b border-[-music-boder-width]">
        <Link href="/play-list">
          <p className="hover:bg-white hover:text-black rounded-full px-10 py-3 border border-[-music-boder-width]">
            Play List
          </p>
        </Link>
        <Link href="/audio-list">
          <p className="hover:bg-white hover:text-black rounded-full px-10 py-3 border border-[-music-boder-width]">
            Audio List
          </p>
        </Link>

        <Link href="/author">
          <p className="hover:bg-white hover:text-black rounded-full px-10 py-3 border border-[-music-boder-width]">
            Author
          </p>
        </Link>
        <Link href="/gerne">
          <p className="hover:bg-white hover:text-black rounded-full px-10 py-3 border border-[-music-boder-width]">
            Gernes
          </p>
        </Link>
      </div>
      {children}
    </div>
  );
}
