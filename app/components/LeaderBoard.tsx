import { Record } from "@/types/types";
import RecordRow from "./RecordRow";

async function getRecords() {
  const options = {
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(`${process.env.BASE_URL}/api/records`, options);
  if (!res.ok) throw new Error("Failed to fetch records");
  return res.json();
}

export default async function LeaderBoard() {
  // const data = await getRecords();
  const data: { body: Record[] } = {
    body: [
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
      { username: "carson", timer: 60, difficulty: 0, wpm: 85 },
      { username: "yo", timer: 60, difficulty: 3, wpm: 64 },
      { username: "hello", timer: 90, difficulty: 1, wpm: 80 },
    ],
  };
  return (
    <div className="min-h-screen bg-dark p-[10vh] font-roboto-mono">
      <h1 className="min-w-full text-2xl text-center text-secondary">
        Leader Board
      </h1>
      <div className="flex flex-col mx-auto bg-secondary overflow-y-scroll scrollbar rounded-lg max-w-lg w-[16rem] md:w-[26rem] lg:w-[32rem] h-[48rem] max-h-[90vh]">
        {data.body.map((rec: Record, idx: number) => (
          <RecordRow record={rec} idx={idx} />
        ))}
      </div>
    </div>
  );
}
