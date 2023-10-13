import { getAuthorList, getGenreList } from '@/api/dashboard';
import CreateForm from './CreateForm';

const Page = async () => {
  const { data: author } = await getAuthorList();
  const { data: genre } = await getGenreList();
  return <CreateForm author={author} genre={genre} />;
};

export default Page;
