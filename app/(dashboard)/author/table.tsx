'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AudioList = {
  id: number;
  name: string;
};

export const GenreTable = ({
  gerne,
  changeType,
}: {
  gerne: { id: number; name: string }[];
  changeType: (
    type: 'create' | 'update',
    data: { id: number; name: string }
  ) => void;
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gerne?.map((item) => (
            <TableRow className="text-center" key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex gap-5 justify-center ">
                <div
                  onClick={() => {
                    changeType('update', item);
                  }}
                  className="cursor-pointer rounded-md hover:bg-accent p-2"
                >
                  <Pencil size={20} />
                </div>
                <div className="cursor-pointer rounded-md hover:bg-accent p-2">
                  <Trash2 size={20} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
