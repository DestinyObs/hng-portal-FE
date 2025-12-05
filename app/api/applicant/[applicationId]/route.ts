import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ applicationId: string }> }, // params is now a Promise
) {
  const { applicationId } = await context.params; // await the promise

  const searchParams = request.nextUrl.searchParams;
  const companyId = searchParams.get('companyId');
  const jobId = searchParams.get('jobId');

  if (!companyId || !jobId) {
    return NextResponse.json(
      { error: 'Missing companyId or jobId' },
      { status: 400 },
    );
  }

  const url = `https://api.staging.connect.hng.tech/api/employer/company/${companyId}/jobs/${jobId}/applications/${applicationId}`;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const cookie = request.headers.get('cookie');
    if (cookie) headers['cookie'] = cookie;

    const authorization = request.headers.get('authorization');
    if (authorization) headers['authorization'] = authorization;

    const res = await fetch(url, {
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `API returned ${res.status}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch from API' },
      { status: 500 },
    );
  }
}
