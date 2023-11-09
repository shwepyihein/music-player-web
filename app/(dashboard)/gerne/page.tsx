import { getGenreList } from '@/api/dashboard';
import GernePage from './genrePage';

const Page = async () => {
  const { data: gerne } = await getGenreList();
  return <GernePage gerne={gerne} />;
};

export default Page;
