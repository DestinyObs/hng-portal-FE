'use server';

import { getServerCookies } from '@/lib/cookies-helper';
import { Button } from '../ui/button';

const HeaderAuthButtons = async ({
  component,
}: {
  component: React.ReactNode;
}) => {
  const { token, user } = await getServerCookies();

  return <>{token && user ? <Button>Back to Dashboard</Button> : component}</>;
};
export default HeaderAuthButtons;
