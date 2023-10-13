'use client';
import { getGenreList } from '@/api/dashboard';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { GerneForm } from './create';
import { GenreTable } from './table';

const GernePage = ({ gerne }: { gerne: { id: number; name: string }[] }) => {
  const [type, setType] = useState<'create' | 'update'>('create');
  const [detail, setDetail] = useState<{ id: number; name: string }>({
    id: 0,
    name: '',
  });
  const [gerneList, setGenreList] = useState<{ id: number; name: string }[]>(
    []
  );

  const changeType = (
    type: 'create' | 'update',
    data: { id: number; name: string }
  ) => {
    setType(type);
    setDetail(data);
  };

  useEffect(() => {
    setGenreList(gerne);
  }, []);
  const fetchData = async () => {
    const data = await getGenreList();
    setGenreList(data.data);
  };
  return (
    <div className="grid grid-cols-12 py-20 gap-10">
      <div className="col-span-7">
        <GerneForm fetchGerne={fetchData} data={detail} type={type} />
      </div>

      <div className="col-span-5">
        {type === 'update' && (
          <div className="flex mb-5 justify-end">
            <Button
              onClick={() => {
                changeType('create', {
                  id: 0,
                  name: '',
                });
              }}
            >
              Create
            </Button>
          </div>
        )}
        <GenreTable
          fetchGerne={fetchData}
          changeType={changeType}
          gerne={gerneList}
        />
      </div>
    </div>
  );
};

export default GernePage;
