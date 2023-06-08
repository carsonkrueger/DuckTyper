import { NextResponse } from "next/server";

import prisma from "@/prisma/client";
import { Record } from "@/types/types";

export async function GET() {
  try {
    const data: Record[] = await prisma.record.findMany();
    return NextResponse.json({ body: data });
  } catch (error) {
    throw error;
  }
}
