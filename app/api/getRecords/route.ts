import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

type Record = {
  username: string;
  timer: number;
  difficulty: number;
  wpm: number;
};

type Data = {
  records: Record[];
};

export async function GET() {
  try {
    const data = await prisma.record.findMany();
    return NextResponse.json({ body: data });
  } catch (error) {
    throw error;
  }
}
