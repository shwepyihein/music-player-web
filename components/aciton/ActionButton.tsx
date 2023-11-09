'use client';
import { MoreVertical, Pencil, Trash2, View } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { deleteAudioById } from '@/api/audio';
import { deletePlayList } from '@/api/playlist';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ActionButton = ({ id, type }: { id: number; type: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = (v: string) => {
    switch (v) {
      case 'detail':
        return router.push(pathname + `/detail/${id}`);
      case 'edit':
        return router.push(pathname + `/update/${id}`);
    }
  };

  const handleDelete = async () => {
    if (type === 'playList') {
      await deletePlayList(id);
    }
    if (type === 'audio') {
      await deleteAudioById(id);
    }
    window.location.reload();
  };
  return (
    <div className="flex gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              handleRoute('detail');
            }}
            className="flex gap-3"
          >
            <View size={16} />
            <p>Detail</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleRoute('edit');
            }}
            className="flex gap-3"
          >
            <Pencil size={16} /> <p>Edit</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div
        onClick={() => {
          handleDelete();
        }}
      >
        <Trash2 size={16} />
      </div>
    </div>
  );
};

export default ActionButton;
