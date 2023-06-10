import { Record } from "@/types/types";

interface props {
  record: Record;
  idx: number;
}

export default function RecordRow({ record, idx }: props) {
  const isEven = idx % 2 === 0;
  return (
    <div
      className={`flex p-1 py-3 rounded-xl [&>p]:min-w-[21%]  text-center bg-secondaryHighlight`}
    >
      <div className="min-w-[14%] text-white">{idx}</div>
      <p className="text-start  pl-1">{record.username}</p>
      <p>{record.wpm}</p>
      <p>{record.difficulty}</p>
      <p>{record.timer}</p>
    </div>
  );
}
