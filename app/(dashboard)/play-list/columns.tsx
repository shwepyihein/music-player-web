'use client';

import ActionButton from '@/components/aciton/ActionButton';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  name: number;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
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
    accessorKey: 'deleted_at',
    header: 'Deleted At',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => <ActionButton id={row.getValue('id')} />,
  },
];
