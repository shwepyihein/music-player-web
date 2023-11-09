'use client';

import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { createPlayList } from '@/api/playlist';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  playList: z.number().array(),
});

interface CreateFormProps {
  audioList: any;
}

export function CreateForm({ audioList }: CreateFormProps) {
  const router = useRouter();
  const [selectedGenreList, setSelectedGenreList] = useState<any>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      playList: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createPlayList(values);
      if (res.data.success) {
        router.back();
      }
    } catch (error) {}
  }

  return (
    <div className="gap-10 max-w-3xl lg:mx-auto mx-5 py-5">
      <div className="col-span-3 pb-4  flex items-center">
        <p className="text-3xl font-bold">Creating New PlayList</p>
      </div>
      <div className="col-span-9 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Play List Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Audio title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Genres</p>
            <div className="flex gap-3 bg-accent/40 py-2 px-5 h-24 rounded-md flex-wrap items-start">
              {selectedGenreList.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="px-3 flex items-center py-2 justify-center rounded-md bg-accent"
                >
                  <p>{item.title}</p>
                  <div
                    onClick={() => {
                      const oldData = form.watch('playList');
                      const filterState = oldData.filter((o) => o !== item.id);
                      const filterSelected = selectedGenreList.filter(
                        (s: any) => s.id !== item.id
                      );
                      form.setValue('playList', filterState);
                      setSelectedGenreList(filterSelected);
                    }}
                    className="px-3 flex items-center justify-center rounded-md hover:bg-accent/25"
                  >
                    <Trash2 size={16} />
                  </div>
                </div>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-72" asChild>
                <Button variant="outline">Choose Audio</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 ">
                {audioList?.map((item: any, idx: number) => (
                  <DropdownMenuGroup
                    className="flex gap-2 justify-between"
                    key={idx}
                  >
                    <DropdownMenuItem
                      className="w-full pl-5"
                      onClick={() => {
                        const oldData = form.watch('playList');
                        const find = oldData.find((o) => o === item.id);
                        if (!find) {
                          const newData = [...oldData, item.id];
                          form.setValue('playList', newData);
                          setSelectedGenreList([...selectedGenreList, item]);
                        }
                      }}
                    >
                      {item.title}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                ))}
                <DropdownMenuGroup className="">
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/audio-list/create');
                    }}
                    className="cursor-pointer justify-center relative my-3 uppercase gap-1 text-center flex  select-none items-center rounded-sm py-1.5  text-sm outline-none transition-colors bg-accent text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <PlusCircle size={16} /> Add New Audio
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className='className="flex justify-end"'>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateForm;
