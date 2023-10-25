import { getAudioList } from '@/api/dashboard';
import CreateForm from './createForm';

const Page = async () => {
  const { data: audioList } = await getAudioList();

  return <CreateForm audioList={audioList.data} />;
};

export default Page;
