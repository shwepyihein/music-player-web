import { getAudioRandomList } from '@/api/audio';
import { getPlayListAndAudio } from '@/api/dashboard';
import { MusicProvider } from '@/context/MusicProvider';
import Main from './Main';

export default async function Home() {
  const { data: playlists } = await getPlayListAndAudio();
  const { data: audioRandom } = await getAudioRandomList(10);
  return (
    <MusicProvider>
      <Main playList={playlists} audioRandom={audioRandom} />
    </MusicProvider>
  );
}
