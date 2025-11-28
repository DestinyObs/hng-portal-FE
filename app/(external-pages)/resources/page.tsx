'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

const BLOG_POSTS = [1, 2, 3, 4, 5, 6].map((item) => ({
  id: item,
  title: 'Understanding the Right Talent For The Jobs',
  summary:
    'Lorem ipsum dolor sit amet consectetur. Convallis hunc eget egestas arcu enim sem.',
  image: '/assets/resources/images/blog.png',
}));

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      console.log(values);
      toast.success('Message sent successfully!');
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-1">
        <section className="relative bg-primary-300 h-[550px] flex flex-col justify-center items-center overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-white-50 text-5xl md:text-4xl font-semibold mb-4">
              The HNG Blog
            </h1>
            <p className="max-w-[632px] mx-auto font-normal text-white-50 text-lg">
              Here&apos;s a quick guide to help talents and recruiters
              understand how HNG works within the HNG ecosystem.
            </p>
          </div>
          <div className="absolute w-full h-full pointer-events-none opacity-40">
            <Image
              src="/assets/resources/images/bg-pattern.png"
              alt="bg-pattern"
              fill
              className="object-cover object-bottom"
            />
          </div>
        </section>

        <section className="py-8 lg:py-20 bg-white">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
              {BLOG_POSTS.map((post) => (
                <Link
                  href="/resources/the-ultimate-guide-to-getting-hired"
                  key={post.id}
                  className="block"
                >
                  <article key={post.id} className="group cursor-pointer">
                    <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-4 bg-white">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="w-87 py-3">
                      <h3 className="font-bold text-2xl text-gray-200 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-75 text-base ">{post.summary}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className=" p-4 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto border border-[#E7E7E7] rounded-2xl p-8 md:p-12">
              <h2 className="text-4xl font-normal text-center mb-10 text-black">
                Express your interest
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-base text-gray-900">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="border-[#E7E7E7]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-base text-gray-900">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              className="border-[#E7E7E7]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base text-gray-900">
                          Your Message...
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here."
                            className="border-[#E7E7E7] min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-center w-full pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary-300 hover:bg-primary-200 text-base text-white w-auto px-6 py-3 rounded-lg font-semibold"
                    >
                      {isLoading ? 'Sending...' : 'Continue'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
