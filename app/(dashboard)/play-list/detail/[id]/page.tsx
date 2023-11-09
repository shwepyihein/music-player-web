import { getAudioList } from '@/api/dashboard';
import { getPlayListById } from '@/api/playlist';
import { UpdateDetailPlayList } from './detailForm';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: detail } = await getPlayListById(id);
  const { data: audioList } = await getAudioList();
  return <UpdateDetailPlayList audioList={audioList.data} detail={detail} />;
};

export default Page;
