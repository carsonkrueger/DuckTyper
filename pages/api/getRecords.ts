import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

type Record = {
  username: string;
  timer: number;
  difficulty: number;
  wpm: number;
};

type Data = {
  records: Record[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET")
    try {
      const data = await prisma.record.findMany();
      // console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
}
