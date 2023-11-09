import { getPlayListAndAudio } from '@/api/dashboard';
import Main from './Main';
import { MusicProvider } from '@/context/MusicProvider';

export default async function Home() {
  const { data: playlists } = await getPlayListAndAudio();
  return (
    <MusicProvider>
      <Main playList={playlists} />
    </MusicProvider>
  );
}
