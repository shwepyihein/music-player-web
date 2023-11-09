import { getAudioById } from '@/api/audio';
import { getAuthorList, getGenreList } from '@/api/dashboard';
import DetailForm from './detailForm';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: detail } = await getAudioById(id);
  const { data: author } = await getAuthorList();
  const { data: genre } = await getGenreList();
  return <DetailForm author={author} genre={genre} detail={detail} />;
};

export default Page;
