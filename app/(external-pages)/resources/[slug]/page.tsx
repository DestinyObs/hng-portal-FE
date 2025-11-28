import Head from 'next/head';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { nextArticles } from '@/public/assets/images/landing-page/shared/constants';
import { OtherArticleCard } from '@/components/blog/other-article-card';

const BlogPost = () => {
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
              November 28, 2025
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-bold mb-8">
              The Ultimate Guide to <br /> Getting Hired in 2025
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
              Lorem Ipsum
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur. Convallis nunc eget
              egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper
              neque faucibus. Aliquet tellus venenatis tristique bibendum lectus
              in sit elit id. Ornare porta rutrum faucibus ligula ut in id ante
              duis. Cum pharetra scelerisque amet feugiat diam congue sed
              pellentesque. Interdum quis id molestie id ultrices. In praesent
              ut semper dictum augue pharetra tristique. Nibh consequat purus
              lacus quis placerat duis tempus. Elementum posuere ut quis ipsum
              et. Eleifend quis in iaculis semper. Quis faucibus non eu eget vel
              est ut. Est dolor orci placerat faucibus pellentesque ultrices
              parturient. Eu morbi integer sit sit sed. Id justo amet vestibulum
              eget a. Id turpis gravida sed amet. Euismod lorem est pulvinar
              amet et diam arcu. Nulla ut nunc senectus lectus cursus neque.
              Nascetur justo at auctor habitant. Eget consequat quis
              pellentesque non euismod convallis tortor euismod. Purus amet a
              purus bibendum amet. Id enim duis praesent elementum nunc fames.
              Ornare dis mi mattis cursus vel eu aenean gravida purus. Integer
              id egestas blandit tristique at eget odio id nisl. Vel auctor
              consectetur sapien est est et. Mi ac pulvinar pellentesque dui
              iaculis ut vitae purus. Elementum hendrerit scelerisque leo quam
              orci. Ullamcorper ac amet ullamcorper consectetur. Id sed ut id
              tellus. Nisl massa adipiscing turpis sed amet non. Dictum euismod
              fermentum rhoncus morbi massa.
            </p>
          </section>

          {/* Second Section */}
          <section className="pt-12">
            <h2 className="text-xl sm:text-3xl font-semibold mb-4">
              Lorem Ipsum
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              Lorem ipsum dolor sit amet consectetur. Convallis nunc eget
              egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper
              neque faucibus. Aliquet tellus venenatis tristique bibendum lectus
              in sit elit id. Ornare porta rutrum faucibus ligula ut in id ante
              duis. Cum pharetra scelerisque amet feugiat diam congue sed
              pellentesque. Interdum quis id molestie id ultrices. In praesent
              ut semper dictum augue pharetra tristique. Nibh consequat purus
              lacus quis placerat duis tempus. Elementum posuere ut quis ipsum
              et. Eleifend quis in iaculis semper. Quis faucibus non eu eget vel
              est ut. Est dolor orci placerat faucibus pellentesque ultrices
              parturient. Eu morbi integer sit sit sed. Id justo amet vestibulum
              eget a. Id turpis gravida sed amet. Euismod lorem est pulvinar
              amet et diam arcu. Nulla ut nunc senectus lectus cursus neque.
              Nascetur justo at auctor habitant. Eget consequat quis
              pellentesque non euismod convallis tortor euismod. Purus amet a
              purus bibendum amet. Id enim duis praesent elementum nunc fames.
              Ornare dis mi mattis cursus vel eu aenean gravida purus. Integer
              id egestas blandit tristique at eget odio id nisl. Vel auctor
              consectetur sapien est est et. Mi ac pulvinar pellentesque dui
              iaculis ut vitae purus. Elementum hendrerit scelerisque leo quam
              orci. Ullamcorper ac amet ullamcorper consectetur. Id sed ut id
              tellus. Nisl massa adipiscing turpis sed amet non. Dictum euismod
              fermentum rhoncus morbi massa.
            </p>
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
                {nextArticles.map((article, index) => (
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
