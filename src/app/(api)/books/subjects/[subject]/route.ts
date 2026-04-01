import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> },
) {
  const { subject } = await params;
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "12";
  const offset = searchParams.get("offset") ?? "0";

  const res = await fetch(
    `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=${limit}&offset=${offset}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `OpenLibrary error: ${res.status}` },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
