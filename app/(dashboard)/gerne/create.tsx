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

import { UpdateGerneById, createGerne } from '@/api/genre-author';
import { useEffect } from 'react';

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function GerneForm({
  data,
  type,
  fetchGerne,
}: {
  type: 'create' | 'update';
  fetchGerne: () => void;
  data: { id: number; name: string };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.id === 0) {
      try {
        await createGerne({ name: values.name });
        alert('success');
        form.reset({
          id: 0,
          name: '',
        });
      } catch (error) {}
    } else {
      await UpdateGerneById(values.id, { name: values.name });
    }
    await fetchGerne();
  }
  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <div className="gap-10 max-w-3xl lg:mx-auto mx-5 py-5">
      <div className="col-span-3 pb-4  flex items-center">
        <p className="text-3xl capitalize font-bold">{type} New Genre</p>
      </div>
      <div className="col-span-9 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre Name</FormLabel>
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

            <div className='className="flex justify-end"'>
              <Button type="submit" className="capitalize">
                {type}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default GerneForm;
