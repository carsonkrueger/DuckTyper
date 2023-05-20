"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Letter from "./components/Letter";
import Image from "next/image";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const trueText = useRef<Array<string>>(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book".split(
      ""
    )
  );
  const initTime = useRef(30);
  const keysPressed = useRef(0);
  const lettersPerWord = useRef(5);

  const [userText, setUserText] = useState<Array<string>>([]);
  const [timer, setTimer] = useState<number>(initTime.current);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    if (isPaused) setTimer(initTime.current);
    else {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsPaused(false);
    setUserText(e.target.value.split(""));
  };

  const addKeyPress = () => {
    keysPressed.current += 1;
  };

  const removeKeyPress = () => {
    keysPressed.current -= 1;
  };

  const reset = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    inputRef.current.value = "";
    keysPressed.current = 0;
    setUserText([]);
    setIsPaused(true);
  };

  const calcTime = (): string => {
    const time = (
      (keysPressed.current /
        lettersPerWord.current /
        (initTime.current - timer)) *
      60
    ).toFixed(0);
    if (time !== "NaN" && time !== "Infinity") return time;
    else return "0";
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-10 bg-dark text-secondary font-roboto-mono">
      <header className="flex flex-row absolute top-0 pt-4 text-3xl text-white">
        <Image
          src={"/duck.svg"}
          alt={"DuckTyper logo"}
          width={20}
          height={20}
        />
        DuckTyper
      </header>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-between text-4xl text-primary">
          <p>{timer}</p>
          <div className="flex flex-row items-center space-x-3">
            <p>{calcTime()}</p>
            <p className="text-lg text-secondary">wpm</p>
          </div>
        </div>

        <div className="relative flex flex-wrap max-w-6xl text-2xl select-none">
          {trueText.current.map((ch, idx) => (
            <Letter
              trueLetter={ch}
              userLetter={userText[idx]}
              addKeyPress={addKeyPress}
              key={idx}
            />
          ))}
          <textarea
            className="absolute min-h-full min-w-full resize-none bg-transparent text-transparent select-auto outline-none cursor-pointer"
            onChange={onTextChange}
            ref={inputRef}
            spellCheck={false}
          />
        </div>
        <a className="self-center p-2" href="" onClick={reset}>
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
