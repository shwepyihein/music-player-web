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

import { createGerne } from '@/api/genre-author';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
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
}

export function CreateGerne({}: CreateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createGerne({ name: values.name });
  }

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
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateGerne;
