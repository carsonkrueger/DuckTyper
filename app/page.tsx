"use client";

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Letter from "./components/Letter";
import Image from "next/image";
import { letterType } from "./types/letterTypes";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const trueText = useRef<Array<string>>(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book".split(
      ""
    )
  );
  const initTime = useRef(10);
  const correctKeysPressed = useRef(0);
  const totalKeysPressed = useRef(0);
  const lettersPerWord = useRef(5);
  const canType = useRef(true);

  const [userText, setUserText] = useState<Array<string>>([]);
  const [timer, setTimer] = useState<number>(initTime.current);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (timer <= 0.01) {
      canType.current = false;
      setIsPaused(true);
    }
  }, [timer]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsPaused(false);
    setUserText(e.target.value.split(""));
  };

  const addKeyPress = (lType: letterType) => {
    switch (lType) {
      case letterType.CORRECT:
        correctKeysPressed.current++;
        totalKeysPressed.current++;
      case letterType.INCORRECT:
        totalKeysPressed.current++;
    }
  };

  const removeKeyPress = (lType: letterType) => {
    switch (lType) {
      case letterType.CORRECT:
        correctKeysPressed.current--;
        totalKeysPressed.current--;
      case letterType.INCORRECT:
        totalKeysPressed.current--;
    }
  };

  const reset = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    inputRef.current.value = "";
    correctKeysPressed.current = 0;
    totalKeysPressed.current = 0;
    canType.current = true;
    setUserText([]);
    setIsPaused(true);
    setTimer(initTime.current);
    focusInputEl();
  };

  const focusInputEl = () => {
    inputRef.current.focus();
  };

  const calcTime = (): string => {
    const time = (
      (correctKeysPressed.current /
        lettersPerWord.current /
        (initTime.current - timer)) *
      60
    ).toFixed(0);
    if (time !== "NaN" && time !== "Infinity") return time;
    else return "0";
  };

  return (
    <main
      className="flex flex-col min-h-screen items-center justify-between p-10 bg-dark text-secondary font-roboto-mono"
      onClick={focusInputEl}
    >
      <header className="flex flex-row justify-between max-w-6xl min-w-max text-3xl text-white">
        <div className="flex space-x-3">
          <Image
            src={"/duck.svg"}
            alt={"DuckTyper logo"}
            width={30}
            height={30}
          />
          <p>DuckTyper</p>
        </div>

        <div></div>
        {/* <a
          className="flex justify-center"
          href=""
          onClick={(e) => e.preventDefault()}
        >
          <Image
            className="[&>svg>g>path]:fill-white"
            src={"/share.svg"}
            alt={"Share website"}
            width={25}
            height={25}
          />
        </a> */}
      </header>

      <div className="flex flex-col max-w-6xl space-y-2">
        <div className="flex flex-row justify-between text-4xl text-primary">
          <div className="flex space-x-3">
            <p className={" min-w-[2.5rem]"}>{timer}</p>
            <div
              className={`${
                isPaused ? "" : "hidden"
              } flex text-sm text-secondary space-x-1 my-2 justify-center items-center rounded-lg border border-secondary first:pl-2 [&>*]:overflow-hidden [&>*]:cursor-pointer`}
            >
              <p className="hover:bg-white">30</p>
              <p className="hover:bg-white">60</p>
              <p className="hover:bg-white">90</p>
            </div>
          </div>

          <div className="flex flex-row items-end space-x-2">
            <p>{calcTime()}</p>
            <p className="text-lg text-secondary">wpm</p>
          </div>
        </div>

        <div className="relative flex flex-wrap text-2xl select-none">
          {trueText.current.map((ch, idx) => (
            <Letter
              trueLetter={ch}
              userLetter={userText[idx]}
              isFrontLetter={idx === totalKeysPressed.current && !isPaused}
              addKeyPress={addKeyPress}
              removeKeyPress={removeKeyPress}
              key={idx}
            />
          ))}
          <textarea
            className="absolute min-h-full min-w-full resize-none bg-transparent text-transparent select-auto outline-none cursor-pointer"
            onChange={onTextChange}
            ref={inputRef}
            spellCheck={false}
            disabled={!canType.current}
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

      <div></div>
    </main>
  );
}
