import { Record } from "@/types/types";

interface props {
  record: Record;
  idx: number;
}

export default function RecordRow({ record, idx }: props) {
  const isEven = idx % 2 === 0;
  return (
    <div
      className={`flex p-1 [&>p]:min-w-[22.5%]  text-center ${
        isEven ? "bg-secondaryLowlight text-secondary" : "text-white"
      }`}
    >
      <div className="min-w-[10%]">{idx}</div>
      <p className="text-start pl-1">{record.username}</p>
      <p>{record.wpm}</p>
      <p>{record.difficulty}</p>
      <p>{record.timer}</p>
    </div>
  );
}
