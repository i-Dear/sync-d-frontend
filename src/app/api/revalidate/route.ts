import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return console.error("태그가 없습니다.");
  }

  try {
    await revalidateTag(tag);
  } catch (error) {
    console.error("태그 재검증에 실패했습니다.", error);
  }

  return Response.json({ revalidated: true, tag });
}
