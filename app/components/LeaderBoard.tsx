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
      <div className="flex flex-col mx-auto overflow-y-scroll space-y-2 scrollbar rounded-lg max-w-lg w-[16rem] md:w-[26rem] lg:w-[32rem] h-[48rem] max-h-[90vh]">
        <div className="p-1 flex [&>p]:min-w-[21%] [&>p]:pl-1 [&>p]:text-center">
          <div className="min-w-[14%] text-center">Rank</div>
          <p className="text-start">Name</p>
          <p>WPM</p>
          <p>Diff</p>
          <p>Time</p>
        </div>
        {data.body.map((rec: Record, idx: number) => (
          <RecordRow record={rec} idx={idx} />
        ))}
      </div>
    </div>
  );
}
