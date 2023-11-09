import { getAudioList } from '@/api/dashboard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '../../../components/ui/data-table';
import { columns } from './columns';

export default async function Page() {
  const res = await getAudioList();

  return (
    <div className=" mx-auto py-5">
      <div className="flex justify-end py-5">
        <Link href="/audio-list/create">
          <Button className="px-10">Create Audio</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={res.data.data} />
    </div>
  );
}
