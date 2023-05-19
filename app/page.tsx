"use client";

import { useRef } from "react";
import Letter from "./components/Letter";

export default function Home() {
  const trueText = useRef<Array<string>>(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book".split(
      ""
    )
  );
  // console.log(trueText.current);
  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-10 bg-primary text-secondary font-roboto-mono">
      <header className="absolute top-0 text-xl">DuckTyper</header>

      <div className="relative flex flex-wrap max-w-6xl min-w-[64rem] max-h-48 text-2xl select-none">
        {/* <div>{trueText.current}</div> */}
        {trueText.current.map((ch, idx) => (
          <Letter letter={ch} key={idx} />
        ))}
        <textarea className="absolute min-h-full min-w-full resize-none bg-transparent select-none outline-none" />
      </div>
    </main>
  );
}
