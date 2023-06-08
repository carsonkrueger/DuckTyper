import Game from "@/app/components/Game";
import LeaderBoard from "@/app/components/LeaderBoard";

export default function Home() {
  return (
    <>
      <Game />
      {/* @ts-expect-error Async Server Component */}
      <LeaderBoard />
    </>
  );
}
