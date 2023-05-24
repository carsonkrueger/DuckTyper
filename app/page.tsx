"use client";

import {
  ChangeEvent,
  MouseEvent,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

export const UserContext = createContext<ContextType>(null!);

import Word from "./components/Word";
import { IWord, LetterTypeState, ContextType } from "./types/contextTypes";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const [trueText, setTrueText] = useState<string[]>(
    "Hello my friend".split(" ")
  );
  const [userText, setUserText] = useState<string[]>([]);
  const [trueWords, setTrueWords] = useState<IWord[]>(
    trueText.map((word, idx) => ({
      trueWord: word.concat(" "),
      wordPos: idx,
    }))
  );
  const [letterStates, setLetterStates] = useState<LetterTypeState[][]>(
    trueWords.map((word) =>
      word.trueWord.split("").map((_) => LetterTypeState.NORMAL)
    )
  );

  const [totalKeysPressed, setTotalKeysPressed] = useState<number>(0);
  const correctKeysPressed = useRef(0);
  const errorsPressed = useRef(0);

  const lettersPerWord = useRef(5);
  const canType = useRef(true);

  const initTimes = useRef([30, 60, 90]);
  const initTime = useRef(initTimes.current[1]);
  const [timer, setTimer] = useState<number>(initTime.current);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const curWordPos = useRef(0);
  const curLetterPos = useRef(0);
  const curWordLength = useRef(trueWords[curWordPos.current].trueWord.length);

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
    const userText = e.target.value.split("");
    if (isPaused) setIsPaused(false);

    const added = userText.length > totalKeysPressed;
    setTotalKeysPressed(userText.length);

    let newLetterStates = [...letterStates];
    const isMatching =
      trueText[curWordPos.current][curLetterPos.current] ===
      userText[userText.length - 1];

    if (isMatching && added)
      newLetterStates[curWordPos.current][curLetterPos.current] =
        LetterTypeState.CORRECT;
    else if (!isMatching && added)
      newLetterStates[curWordPos.current][curLetterPos.current] =
        LetterTypeState.INCORRECT;
    else if (!added)
      newLetterStates[curWordPos.current][curLetterPos.current] =
        LetterTypeState.NORMAL;

    console.log(letterStates);
    setLetterStates(newLetterStates);

    calcNextPosition(added);
  };

  const setInitTime = (time: number) => {
    initTime.current = time;
    setTimer(initTime.current);
  };

  const addCorrectKeyPress = () => {
    correctKeysPressed.current++;
  };

  const removeCorrectKeyPress = () => {
    correctKeysPressed.current--;
  };

  const addErrorKeyPress = () => {
    errorsPressed.current++;
  };

  const reset = (e?: MouseEvent<HTMLAnchorElement>) => {
    setIsPaused(true);
    if (e) e.preventDefault();
    inputRef.current.value = "";
    correctKeysPressed.current = 0;
    errorsPressed.current = 0;
    canType.current = true;
    curWordPos.current = 0;
    curLetterPos.current = 0;
    curWordLength.current = trueWords[curWordPos.current].trueWord.length;
    setTotalKeysPressed(0);
    setUserText([]);
    setLetterStates(
      trueWords.map((word) =>
        word.trueWord.split("").map((_) => LetterTypeState.NORMAL)
      )
    );
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

  // returns word, letter position
  const calcNextPosition = (added: boolean) => {
    if (added) {
      curLetterPos.current++;
      if (curLetterPos.current >= curWordLength.current) {
        curWordPos.current++;
        curWordLength.current = trueWords[curWordPos.current].trueWord.length;
        curLetterPos.current = 0;
      }
    } else if (!added) {
      curLetterPos.current--;
      if (curLetterPos.current < 0) {
        curWordPos.current--;
        curWordLength.current = trueWords[curWordPos.current].trueWord.length;
        curLetterPos.current = curWordLength.current - 1;
      }
    }
  };

  return (
    <main
      className="flex flex-col min-h-screen items-center justify-between p-10 bg-dark text-secondary font-roboto-mono"
      onClick={focusInputEl}
    >
      <UserContext.Provider
        value={{
          trueWords: trueWords,
          frontPos: [
            trueWords.length,
            trueWords[trueWords.length - 1].trueWord.length,
          ],
          letterStates: letterStates,
        }}
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
                {initTimes.current.map((time, idx) => (
                  <p
                    className={`hover:bg-secondaryHighlight ${
                      initTime.current === initTimes.current[idx]
                        ? "bg-secondaryLowlight"
                        : ""
                    }`}
                    onClick={() => setInitTime(initTimes.current[idx])}
                    key={idx}
                  >
                    {time}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-row items-end space-x-2">
              <p>{calcTime()}</p>
              <p className="text-lg text-secondary">wpm</p>
            </div>
          </div>

          <div className="relative flex flex-wrap text-2xl select-none max-h-[6.5rem] overflow-hidden">
            {trueText.map((_, idx) => (
              <Word wordPos={idx} key={idx} />
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
      </UserContext.Provider>
    </main>
  );
}
