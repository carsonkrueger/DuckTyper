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
  const correctKeysPressed = useRef(0);
  // const totalKeysPressed = useRef(0);
  const errorsPressed = useRef(0);
  const lettersPerWord = useRef(5);
  const canType = useRef(true);
  const initTime = useRef(30);

  const [totalKeysPressed, setTotalKeysPressed] = useState<number>(0);
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

  useEffect(() => {
    setTotalKeysPressed(userText.length);
  }, [userText]);

  const setInitTime = (time: number) => {
    initTime.current = time;
    setTimer(initTime.current);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsPaused(false);
    setUserText(e.target.value.split(""));
  };

  const addKeyPress = () => {
    correctKeysPressed.current++;
  };

  const removeKeyPress = () => {
    correctKeysPressed.current--;
  };

  const addErrorPress = () => {
    errorsPressed.current++;
  };

  const reset = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    inputRef.current.value = "";
    correctKeysPressed.current = 0;
    errorsPressed.current = 0;
    canType.current = true;
    setTotalKeysPressed(0);
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
    if (correctKeysPressed.current <= 0 || time === "Infinity") return "0";
    return time;
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
              } flex text-sm text-secondary my-2 justify-center items-center rounded-lg border border-secondaryHighlight overflow-hidden [&>*]:px-[3px] [&>*]:cursor-pointer`}
            >
              <p
                className={`hover:bg-secondaryHighlight ${
                  initTime.current === 30 ? "bg-secondaryLowlight" : ""
                }`}
                onClick={() => setInitTime(30)}
              >
                30
              </p>
              <p
                className={`hover:bg-secondaryHighlight ${
                  initTime.current === 60 ? "bg-secondaryLowlight" : ""
                }`}
                onClick={() => setInitTime(60)}
              >
                60
              </p>
              <p
                className={`hover:bg-secondaryHighlight ${
                  initTime.current === 90 ? "bg-secondaryLowlight" : ""
                }`}
                onClick={() => setInitTime(90)}
              >
                90
              </p>
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
              isFrontLetter={idx === totalKeysPressed && !isPaused}
              addKeyPress={addKeyPress}
              removeKeyPress={removeKeyPress}
              addErrorPress={addErrorPress}
              key={idx}
            />
          ))}
          <textarea
            className="absolute min-h-full min-w-full resize-none bg-transparent text-transparent selection:bg-transparent outline-none cursor-pointer"
            onChange={onTextChange}
            ref={inputRef}
            spellCheck={false}
            disabled={!canType.current}
          />
        </div>
        <a
          className="self-center p-2 rounded-full hover:bg-secondaryLowlight"
          href=""
          onClick={reset}
        >
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
