import Head from 'next/head';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { OtherArticleCard } from '@/components/blog/other-article-card';
import { blogPosts } from '@/lib/blog-post';

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const param = await params;
  const slug = param.slug;
  console.log(params.slug);

  const post = blogPosts.find((p) => p.slug === slug);
  console.log('Post:', post);

  if (!post) return <div>Post not found</div>;

  const date = new Date(post?.publishedAt || '');

  // Format as "Month Day, Year"
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  console.log(formattedDate);

  return (
    <>
      <Head>
        <title>The Ultimate Guide to Getting Hired in 2025</title>
        <meta
          name="description"
          content="Comprehensive guide to getting hired in 2025."
        />
      </Head>
      <div className="py-12 md:py-16 px-6">
        <main className="w-full md:max-w-4/5 p-10 rounded-2xl mx-auto bg-[#E6F7FF4D]">
          {/* Date */}
          <div className="min-w-sm space-y-8">
            <p className="text-base text-tertiary-100 mb-2 font-light">
              {formattedDate}
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-bold mb-8">
              {post.title}
            </h1>
          </div>

          <div className="relative w-full h-60 md:h-[324px]">
            <Image
              fill
              className="object-cover rounded-b-[20px]"
              src={'/images/blogImg.jpg'}
              alt={'blog image'}
            />
          </div>

          {/* First Section */}
          <section className="pt-12 space-y-[30px] ">
            <h2 className="text-xl sm:text-3xl font-semibold mb-4">
              {post.title}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed text-base md:text-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </section>
        </main>

        {/* other articles  */}
        <div className="pt-16 space-y-8">
          <h3 className="px-2 md:px-32 font-medium text-[32px] w-full">
            Read our Next article
          </h3>
          {/* CAROUSEL AREA */}
          <div className="w-full relative flex justify-end px-5 sm:px-0">
            <Carousel className="w-full sm:w-[92%]">
              {/*  buttons */}
              <div className="absolute -bottom-10 sm:bottom-0 sm:-top-10 right-10 sm:right-20 -translate-y-1/2 flex gap-3">
                <CarouselPrevious
                  icon={<ChevronLeft />}
                  className="bg-[#E3F6FE] text-black p-2 sm:p-1 border-0 "
                />
                <CarouselNext
                  icon={<ChevronRight />}
                  className="bg-[#E3F6FE] text-black p-2 sm:p-1  border-0 "
                />
              </div>

              <CarouselContent className="p-3">
                {blogPosts.map((article, index) => (
                  <OtherArticleCard article={article} key={index} />
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
