'use client';
import { MoreVertical, Pencil, Trash2, View } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ActionButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = (v: string) => {
    switch (v) {
      case 'detail':
        return router.push(pathname + `/detail/${id}`);
      case 'update':
        return router.push(pathname + `/update/${id}`);
      case 'delete':
        return alert('delete');
    }
  };
  return (
    <div>
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

          <DropdownMenuItem
            onClick={() => {
              handleRoute('delete');
            }}
            className="flex gap-3"
          >
            <Trash2 size={16} /> <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionButton;
