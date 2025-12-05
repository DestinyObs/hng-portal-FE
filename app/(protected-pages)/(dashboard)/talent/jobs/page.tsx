import FindJobsPage from '@/components/jobs/find-jobs-page';
import { cookies } from 'next/headers';

export default async function page() {
 const token = (await cookies()).get('token')?.value;
  return <FindJobsPage />;
}
