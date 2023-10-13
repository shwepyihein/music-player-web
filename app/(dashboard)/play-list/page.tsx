import { getPlayList } from '@/api/dashboard';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';
import { columns } from './columns';

export default async function DemoPage() {
  const res = await getPlayList();

  return (
    <div className=" mx-auto py-5">
      <div className="flex justify-end py-5">
        <Link href="/audio-list/create">
          <Button className="px-10">Create PlayList</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={res.data.data} />
    </div>
  );
}
