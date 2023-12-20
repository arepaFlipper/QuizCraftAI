import { NextResponse } from "next/server";

// NOTE: GET http://localhost:3000/api/questions
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ hello: `world This is a ${req.method} request` });
}

// NOTE: POST http://localhost:3000/api/questions
export const POST = async (req: Request, res: Response) => {
  return NextResponse.json({ hello: `world This is a ${req.method} request` });
}
