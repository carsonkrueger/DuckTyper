"use client";

import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import Letter from "./components/Letter";
import Image from "next/image";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const trueText = useRef<Array<string>>(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book".split(
      ""
    )
  );
  const [userText, setUserText] = useState<Array<string>>([]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value.split(""));
  };

  const reset = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    inputRef.current.value = "";
    setUserText([]);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-10 bg-primary text-secondary font-roboto-mono">
      <header className="absolute top-0 text-3xl">DuckTyper</header>

      <div className="flex flex-col space-y-3">
        <div className="relative flex flex-wrap max-w-6xl text-2xl select-none">
          {/* <div>{trueText.current}</div> */}
          {trueText.current.map((ch, idx) => (
            <Letter trueLetter={ch} userLetter={userText[idx]} key={idx} />
          ))}
          <textarea
            className="absolute min-h-full min-w-full resize-none bg-transparent text-transparent select-auto outline-none cursor-pointer"
            onChange={onTextChange}
            ref={inputRef}
            spellCheck={false}
          />
        </div>
        <a className="self-center" href="" onClick={reset}>
          <Image
            className=""
            src={"/redo.svg"}
            alt="redo"
            width={22}
            height={22}
          />
        </a>
      </div>
    </main>
  );
}
