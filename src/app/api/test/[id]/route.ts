import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string} }) {
  const { id } = params;
  console.log("Id", id);

  return NextResponse.json("test123");
}
