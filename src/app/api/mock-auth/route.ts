import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;

    const userInfo = await fetch("http://localhost:9999/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data.find((user: any) => user.userId === userId));

    return Response.json(userInfo);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
