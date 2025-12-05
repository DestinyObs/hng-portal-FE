import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const companyId = searchParams.get('companyId');
  const jobId = searchParams.get('jobId');

  if (!companyId || !jobId) {
    return NextResponse.json(
      { error: 'Missing companyId or jobId' },
      { status: 400 }
    );
  }

  const url = `https://api.staging.connect.hng.tech/api/employer/company/${companyId}/jobs/${jobId}/applications/${params.applicationId}`;

  console.log('Proxying request to:', url);

  try {
    // Forward all relevant headers from the client request
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Forward cookies
    const cookie = request.headers.get('cookie');
    if (cookie) {
      headers['cookie'] = cookie;
    }

    // Forward authorization header if present
    const authorization = request.headers.get('authorization');
    if (authorization) {
      headers['authorization'] = authorization;
    }

    console.log('Request headers:', { cookie: !!cookie, authorization: !!authorization });

    const res = await fetch(url, {
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('API returned error:', res.status);
      return NextResponse.json(
        { error: `API returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from API' },
      { status: 500 }
    );
  }
}