import { CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';

type blogPosts = {
  id: number;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
};

export const OtherArticleCard = ({ article }: { article: blogPosts }) => {
  return (
    <CarouselItem className="cursor-pointer group basis-full w-[384px] sm:basis-1/2 lg:basis-1/4">
      <div className="w-full">
        <Card className="group p-0 py-0 w-full md:h-[292px] h-64 flex flex-col sm:flex-row gap-0 border-0 transition-all duration-300 ease-in-out">
          <CardContent className="relative p-3 rounded-2xl w-full h-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-[11px] group-hover:rounded-[11px] group-hover:scale-105 transition-transform duration-300"
            />
          </CardContent>
        </Card>
        <div className="py-2">
          <h3 className="text-tertiary-200 py-3 text-2xl font-medium">
            {article.title}
          </h3>
          <p className="text-tertiary-75 text-sm ">{article.excerpt}</p>

          <Link
            href={`/resources/${article.slug}`}
            className="pt-5 inline-block underline text-primary-blue hover:text-primary-400"
          >
            see more
          </Link>
        </div>
      </div>
    </CarouselItem>
  );
};
