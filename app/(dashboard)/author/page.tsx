import { getAuthorList, getGenreList } from '@/api/dashboard';
import AuthorPage from './AuthorPage';

const Page = async () => {
  const { data: author } = await getAuthorList();
  return <AuthorPage author={author} />;
};

export default Page;
