import { cookies } from 'next/headers';

export async function getServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = cookieStore.get('user')?.value;

  let parsedUser = null;
  if (user) parsedUser = JSON.parse(user);

  return { token, user: parsedUser };
}
