import PostJob from '@/components/(company)/create-job/post-job';

type Params = Promise<{ id: string }>;

export default async function Editjob({ params }: { params: Params }) {
  const { id } = await params;

  return <PostJob id={id} />;
}
