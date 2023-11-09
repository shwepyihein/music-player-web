'use client';

import ActionButton from '@/components/aciton/ActionButton';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AudioList = {
  id: number;
  title: string;
  image_path: string;
  duration: string;
  year: string;
  description: string;
  author_id: {
    id: 1;
    name: string;
    degree: string;
    decription: string;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export const columns: ColumnDef<AudioList>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Name',
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
  {
    accessorKey: 'title',
    header: 'Name',
  },
  {
    accessorKey: 'author_id.name',
    header: 'Author',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => <ActionButton type={'audio'} id={row.getValue('id')} />,
  },
];
