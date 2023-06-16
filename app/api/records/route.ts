import { NextResponse } from "next/server";

import prisma from "@/prisma/client";
import { Record } from "@/types/types";

async function getAllRecordsDESC() {
  return await prisma.record.findMany({
    orderBy: [{ wpm: "desc" }],
  });
}

async function updateRecord(index: number, record: Record) {
  return await prisma.record.update({
    data: record,
    where: {
      id: index,
    },
  });
}

async function createNewRecord(record: Record) {
  return await prisma.record.create({
    data: record,
  });
}

prisma.$use(async (params, next) => {
  if (params.model === "record") {
    switch (params.action) {
      case "create": {
        const DataTable: Record[] = await getAllRecordsDESC();
        // update record
        if (DataTable.length >= 100) {
          const lastWpm = DataTable[DataTable.length - 1].wpm;
          if (params.args.record.wpm > lastWpm) {
            for (let i = 0; i < DataTable.length; i++) {
              if (DataTable[i].wpm < params.args.record.wpm)
                updateRecord(i, params.args.record);
            }
          }
        }
        // create new record
        else {
          createNewRecord(params.args.record);
        }
      }
      default:
        break;
    }
  }
  const result = await next(params);
  return result;
});

export async function GET() {
  try {
    const table: Record[] = await getAllRecordsDESC();
    return NextResponse.json({ body: table });
  } catch (error) {
    throw error;
  }
}
