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
import { Textarea } from '@/components/ui/textarea';
import UploadImage from '@/components/upload/uploadImage';
import { useForm } from 'react-hook-form';

import { UpdateAudioById } from '@/api/audio';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string(),
  year: z.string(),
  image_path: z.string(),
  file_path: z.string(),
  duration: z.number(),
  author_id: z.string(),
  genre_list: z.number().array(),
});

interface CreateFormProps {
  author: {
    id: number;
    name: string;
  }[];
  genre: {
    id: number;
    name: string;
  }[];
  detail: any;
}

export function DetailForm({ author, detail, genre }: CreateFormProps) {
  const router = useRouter();
  const params = useParams();
  const [selectedGenreList, setSelectedGenreList] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: 0,
      author_id: '',
      image_path: '',
      file_path: '',
      genre_list: [],
    },
  });
  console.log(form.watch());
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uploadData = { ...values, author_id: values.author_id };
    await UpdateAudioById(params.id, uploadData);
  }

  useEffect(() => {
    const numberArray = detail.genre_list.map((item: any) => item.id);
    form.reset({
      ...detail,
      author_id: detail.author_id.id,
      genre_list: numberArray,
    });
    setSelectedGenreList([...detail.genre_list]);
  }, []);

  // const handleDelete = async (path: string) => {
  //   await DeleteFileWithImagePath(path).then((res) => {
  //     form.setValue('duration', 0);
  //     form.setValue('file_path', '');
  //   });
  // };

  return (
    <div className="gap-10 max-w-3xl lg:mx-auto mx-5 py-5">
      <div className="col-span-3 pb-4  flex items-center">
        <p className="text-3xl font-bold">Creating New Audio</p>
      </div>
      <div className="col-span-9 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Type your message here."
                      id="message-2"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display Description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadImage
              onDrop={(v) => {
                setImageFile(v[0]);
              }}
              imageUrl={form.watch('image_path')}
            />
            <FormField
              control={form.control}
              name="author_id"
              render={({ field }) => (
                <FormItem className="flex-col flex">
                  <FormLabel>Author</FormLabel>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-72" asChild>
                        <Button variant="outline">
                          {field.value
                            ? author.find((auth) => auth.id === +field.value)
                                ?.name
                            : 'Please select author'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72 ">
                        {author?.map((item, idx: number) => (
                          <DropdownMenuGroup
                            className="flex gap-2 justify-between"
                            key={idx}
                          >
                            <DropdownMenuItem
                              className="w-full pl-5"
                              onClick={() => {
                                field.onChange(item.id);
                              }}
                            >
                              {item.name}
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        ))}
                        <DropdownMenuGroup className="mx-5">
                          <DropdownMenuItem
                            onClick={() => {
                              router.push('/genre-author/create');
                            }}
                            className="cursor-pointer relative my-3 uppercase gap-5 text-center flex  select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors bg-accent text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            <PlusCircle size={16} /> Add Author
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </FormItem>
              )}
            />
            <p>Genres</p>
            <div className="flex gap-3 bg-accent/40 py-2 px-5 h-24 rounded-md flex-wrap items-start">
              {selectedGenreList.map((item, idx: number) => (
                <div
                  key={idx}
                  className="px-3 flex items-center py-2 justify-center rounded-md bg-accent"
                >
                  <p>{item.name}</p>
                  <div
                    onClick={() => {
                      const oldData = form.watch('genre_list');
                      const filterState = oldData.filter((o) => o !== item.id);
                      const filterSelected = selectedGenreList.filter(
                        (s) => s.id !== item.id
                      );
                      form.setValue('genre_list', filterState);
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
                <Button variant="outline">Choose Genres</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 ">
                {genre?.map((item, idx: number) => (
                  <DropdownMenuGroup
                    className="flex gap-2 justify-between"
                    key={idx}
                  >
                    <DropdownMenuItem
                      className="w-full pl-5"
                      onClick={() => {
                        const oldData = form.watch('genre_list');
                        const find = oldData.find((o) => o === item.id);
                        if (!find) {
                          const newData = [...oldData, item.id];
                          form.setValue('genre_list', newData);
                          setSelectedGenreList([...selectedGenreList, item]);
                        }
                      }}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                ))}
                <DropdownMenuGroup className="">
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/genre-author/create');
                    }}
                    className="cursor-pointer justify-center relative my-3 uppercase gap-1 text-center flex  select-none items-center rounded-sm py-1.5  text-sm outline-none transition-colors bg-accent text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <PlusCircle size={16} /> Add New Genre
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio Release Year</FormLabel>
                  <FormControl>
                    <Input placeholder="Year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file_path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YoutubeId</FormLabel>
                  <FormControl>
                    <Input placeholder="File ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {!form.watch('file_path') && (
              <UploadFile
                onDrop={(v) => {
                  console.log(v);
                  form.setValue('file_path', v.file_path);
                  form.setValue('duration', v.duration);
                }}
              />
            )}
            {form.watch('file_path') && (
              <div className="bg-accent/50 p-5">
                {form.watch('file_path') && (
                  <div>
                    <p className="font-semibold mb-3 text-sm">
                      Audio File Path
                    </p>
                    <Input
                      placeholder="00:00"
                      disabled
                      value={form.watch('file_path')}
                    />
                  </div>
                )}
                {form.watch('file_path') && (
                  <div>
                    <p className="font-semibold mb-3 mt-3 text-sm">Duration</p>
                    <Input
                      placeholder="00:00"
                      disabled
                      value={form.watch('duration') + 's'}
                    />
                  </div>
                )}
                <Button
                  type="button"
                  onClick={() => {
                    handleDelete(form.watch('file_path'));
                  }}
                  className="px-3 flex mt-3 items-center justify-center rounded-md hover:text-white hover:bg-accent/25"
                >
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            )} */}
            <div className='className="flex justify-end"'>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default DetailForm;
