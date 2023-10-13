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

import { creatAuthor, updateAuthorById } from '@/api/genre-author';
import { DeleteFileWithImagePath, getImageSignUrl } from '@/api/uploadService';
import { Textarea } from '@/components/ui/textarea';
import UploadImage from '@/components/upload/uploadImage';
import axios from 'axios';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string(),
  author_image: z.string(),
  degree: z.string(),
});

export function GerneForm({
  data,
  type,
  fetchData,
}: {
  type: 'create' | 'update';
  data: { id: number; name: string };
  fetchData: () => void;
}) {
  const [imageFile, setImageFile] = useState<File | null>();
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  console.log(form.watch());

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.id === 0) {
      if (!imageFile) {
        return alert('image File Missing');
      }
      try {
        const data = await getImageSignUrl(imageFile);
        var readFile = imageFile;
        var reader = new FileReader();
        reader.readAsDataURL(readFile);
        await axios
          .put(data.url, readFile, {
            headers: {
              'Content-Type': imageFile.type,
            },
          })
          .then(async (res) => {
            const uploadData = {
              name: values.name,
              author_image: data.filename,
              description: values.description,
              degree: values.degree,
            };

            await creatAuthor(uploadData);
            alert('success');
            form.reset({
              id: 0,
              name: '',
              author_image: '',
              description: '',
              degree: '',
            });
          });
      } catch (error) {}
    } else {
      if (imageFile instanceof File) {
        const data = await getImageSignUrl(imageFile);
        var readFile = imageFile;
        var reader = new FileReader();
        reader.readAsDataURL(readFile);
        await axios
          .put(data.url, readFile, {
            headers: {
              'Content-Type': imageFile.type,
            },
          })
          .then(async (res) => {
            const uploadData = {
              name: values.name,
              author_image: data.filename,
              description: values.description,
              degree: values.degree,
            };

            await handleDelete(values.author_image);

            await updateAuthorById(values.id, uploadData);
            alert('success');
            form.reset({
              id: 0,
              name: '',
              author_image: '',
              description: '',
              degree: '',
            });
          });
      } else {
        const uploadData = {
          name: values.name,
          author_image: values.author_image,
          description: values.description,
          degree: values.degree,
        };
        await updateAuthorById(values.id, uploadData);
      }
    }
  }

  const handleDelete = async (path: string) => {
    await DeleteFileWithImagePath(path);
  };
  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <div className="gap-10 max-w-3xl lg:mx-auto mx-5 py-5">
      <div className="col-span-3 pb-4  flex items-center">
        <p className="text-3xl capitalize font-bold">{type} New Author</p>
      </div>
      <div className="col-span-9 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input placeholder="gerne name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="degree name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadImage
              onDrop={(v) => {
                setImageFile(v[0]);
              }}
              imageUrl={form.watch('author_image')}
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

            <div className='className="flex justify-end"'>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default GerneForm;
