import { getGenreList } from '@/api/dashboard';
import AuthorPage from './AuthorPage';

const Page = async () => {
  const { data: gerne } = await getGenreList();
  return <AuthorPage gerne={gerne} />;
};

export default Page;
