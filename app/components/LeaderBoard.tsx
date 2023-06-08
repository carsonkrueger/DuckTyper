import { Record } from "@/types/types";

async function getRecords() {
  const res = await fetch(`${process.env.BASE_URL}/api/records`);
  if (!res.ok) {
    console.log("ERROR");
    throw new Error("Failed to fetch records");
  }
  return res.json();
}

export default async function LeaderBoard() {
  const data = await getRecords();
  console.log(data);
  return (
    <div className="min-h-screen bg-dark p-[10vh]">
      <div className="flex flex-col mx-auto bg-secondary overflow-y-scroll scrollbar rounded-lg max-w-lg w-[16rem] md:w-[26rem] lg:w-[32rem] h-[48rem] max-h-[90vh]">
        {data.body.map((rec: Record, idx: number) => (
          <p key={idx}>{rec.username}</p>
        ))}
      </div>
    </div>
  );
}
