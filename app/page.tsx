"use client";

import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import Word from "./components/Word";
import { LetterTypeState, StateType, ACTION } from "./types/contextTypes";
import { UserContext, reducer } from "@/redux/store";

const initialState: StateType = {
  trueText: " ",
  trueWords: [" "],
  letterStates: [[LetterTypeState.NORMAL]],
  frontPos: [0, 0],
  correctLetters: 0,
  incorrectLetters: 0,
  lastLineBreak: 0,
  curLineHeight: 0,
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const textAreaRef = useRef<HTMLTextAreaElement>(null!);
  const wordsRef = useRef<(HTMLDivElement | null)[]>(
    Array(state.trueWords.length)
  );

  const prevUserInputLength = useRef(0);
  const lettersPerWord = useRef(5);
  const canType = useRef(true);

  const initTimes = useRef([30, 60, 90]);
  const initTime = useRef(initTimes.current[1]);
  const [timer, setTimer] = useState<number>(initTime.current);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    focusInputEl();
    dispatch({ type: ACTION.INIT });
  }, []);

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
    const offset = wordsRef.current[state.frontPos[0]]?.offsetTop;
    if (offset === undefined) return;

    if (state.curLineHeight != offset) {
      // if (state.curLineHeight != 0) scrollToNextWord(); // skip first scroll
      if (state.lastLineBreak < state.frontPos[0] && state.curLineHeight != 0) {
        dispatch({ type: ACTION.CONSOLIDATE });
        dispatch({ type: ACTION.GENERATE });
      }
      dispatch({
        type: ACTION.SET_NEW_LINE,
        payload: { lineHeight: offset },
      });
    }
  }, [state.frontPos]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const userText = e.target.value.split("");
    if (isPaused) setIsPaused(false);

    let didIncrease: boolean = userText.length >= prevUserInputLength.current;

    if (didIncrease) {
      const isMatching =
        state.trueWords[state.frontPos[0]][state.frontPos[1]] ===
        userText[userText.length - 1];
      if (isMatching) dispatch({ type: ACTION.ADD_CORRECT });
      else if (!isMatching) dispatch({ type: ACTION.ADD_INCORRECT });
    } else if (!didIncrease) {
      dispatch({ type: ACTION.REMOVE });
    }

    prevUserInputLength.current = userText.length;
  };

  const setInitTime = (time: number) => {
    initTime.current = time;
    setTimer(initTime.current);
    // focusInputEl();
  };

  const newGame = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    dispatch({ type: ACTION.INIT });
    setIsPaused(true);
    setTimer(initTime.current);
    textAreaRef.current.value = "";
    canType.current = true;
    prevUserInputLength.current = 0;
    // focusInputEl();
  };

  const reset = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    dispatch({ type: ACTION.RESET });
    setIsPaused(true);
    setTimer(initTime.current);
    textAreaRef.current.value = "";
    canType.current = true;
    prevUserInputLength.current = 0;
  };

  const focusInputEl = (e?: MouseEvent) => {
    if (e) e.preventDefault();
    textAreaRef.current.focus({ preventScroll: true });
  };

  // const scrollToNextWord = () => {
  //   wordsRef.current[state.frontPos[0]]?.scrollIntoView({ block: "center" });
  // };

  const calcTime = () => {
    const time = (
      (state.correctLetters /
        lettersPerWord.current /
        (initTime.current - timer)) *
      60
    ).toFixed(0);
    if (state.correctLetters <= 0 || time === "Infinity") return "0";
    return time;
  };

  return (
    <main
      className="flex flex-col min-h-screen items-center justify-between p-2 sm:p-10 bg-dark text-secondary font-roboto-mono"
      // onClick={(e) => focusInputEl(e)}
    >
      <UserContext.Provider value={state as StateType}>
        <header className="flex flex-row justify-between max-w-6xl min-w-max text-3xl text-white">
          <div className="flex space-x-3">
            <Image
              className="hover:animate-spin"
              src={"/duck.svg"}
              alt={"DuckTyper logo"}
              width={30}
              height={30}
            />
            <p className="font-Shadows-Into-Light">DuckTyper</p>
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

        <div className="flex flex-col max-w-6xl min-w-full xl:min-w-[72rem] space-y-4">
          <div className="flex justify-between text-4xl text-primary">
            <div className="flex items-center space-x-3">
              <p className={"min-w-[2.5rem]"}>
                {timer.toString().padStart(2, "0")}
              </p>

              <div className={`${isPaused ? "flex" : "hidden"} flex-col`}>
                <p className="absolute text-secondary text-xs self-center -translate-y-4">
                  timer
                </p>
                <div
                  className={` flex text-base text-secondary justify-center items-end rounded-lg border border-secondaryHighlight overflow-hidden [&>*]:px-[3px] [&>*]:cursor-pointer`}
                >
                  {initTimes.current.map((time, idx) => (
                    <p
                      className={`hover:bg-secondaryHighlight outline-none ${
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
            </div>

            <div className="text-4xl flex flex-row space-x-3">
              <div className="flex space-x-1 items-end">
                <p className="text-red-700">{state.incorrectLetters}</p>
                <p className="text-lg text-secondary">err</p>
              </div>
              <div className=" flex space-x-1 items-end">
                <p>{calcTime()}</p>
                <p className="text-lg text-secondary">wpm</p>
              </div>
            </div>
          </div>

          <div
            className="cursor-pointer relative flex flex-wrap text-2xl select-none max-h-[6rem] min-h-[6rem] overflow-hidden"
            onClick={(e) => focusInputEl(e)}
          >
            {state.trueWords.map((_, idx) => (
              <Word
                ref={(el: HTMLDivElement) => {
                  wordsRef.current[idx] = el;
                  return el;
                }}
                wordPos={idx}
                key={idx}
              />
            ))}
            <textarea
              className={`text-xs/3 fixed -z-50 min-h-full min-w-full resize-none bg-transparent text-transparent selection:bg-transparent outline-none caret-transparent scrollbar`}
              onChange={onTextChange}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              ref={textAreaRef}
              spellCheck={false}
              disabled={!canType.current}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          <div
            className={`flex justify-center space-x-10 py-2 [&>a]:p-2 ${
              timer === 0
                ? "[&>a]:animate-pulse [&>a]:bg-secondaryLowlight"
                : ""
            } `}
          >
            <a
              className="rounded-full hover:bg-secondaryLowlight focus:outline-none focus-visible:hidden"
              href=""
              onClick={reset}
            >
              <Image src={"/redo.svg"} alt="redo" width={22} height={22} />
            </a>
            <a
              className="rounded-full hover:bg-secondaryLowlight"
              href=""
              onClick={newGame}
            >
              <Image src={"/next.svg"} alt="next" width={22} height={22} />
            </a>
          </div>
        </div>

        <div></div>
      </UserContext.Provider>
    </main>
  );
}
