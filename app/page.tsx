"use client";

import {
  ChangeEvent,
  MouseEvent,
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Image from "next/image";

export const UserContext = createContext<StateType | null>(null);

import Word from "./components/Word";
import {
  LetterTypeState,
  ActionType,
  StateType,
  ACTION,
} from "./types/contextTypes";

const Initializer = (trueText: string): StateType => {
  return {
    trueText: trueText,
    trueWords: trueText.split(" ").map((word) => word.concat(" ")),
    letterStates: trueText.split(" ").map((word) =>
      word
        .concat(" ")
        .split("")
        .map((_) => LetterTypeState.NORMAL)
    ),
    frontPos: [0, 0],
    correctLetters: 0,
    incorrectLetters: 0,
    curLineHeight: 0,
  };
};

const getNextLetterPostion = (
  curWordPos: number,
  curLetterPos: number,
  curWordLen: number
): [number, number] => {
  if (curLetterPos >= curWordLen - 1) return [curWordPos + 1, 0];
  else return [curWordPos, curLetterPos + 1];
};

const getPreviousLetterPostion = (
  curWordPos: number,
  curLetterPos: number,
  prevWordLen: number
): [number, number] => {
  if (curLetterPos <= 0) return [curWordPos - 1, prevWordLen - 1];
  else return [curWordPos, curLetterPos - 1];
};

const reducer = (state: StateType, action: ActionType): StateType => {
  let curWordPos = state.frontPos[0];
  let curLetterPos = state.frontPos[1];
  switch (action.type) {
    case ACTION.INIT: {
      if (action.payload?.newTrueText)
        return Initializer(action.payload?.newTrueText);
      else throw Error("ERROR: INIT payload missing.");
    }
    case ACTION.ADD_CORRECT: {
      let newLetterStates: LetterTypeState[][] = [...state.letterStates];
      newLetterStates[curWordPos][curLetterPos] = LetterTypeState.CORRECT;
      return {
        ...state,
        letterStates: newLetterStates,
        frontPos: getNextLetterPostion(
          curWordPos,
          curLetterPos,
          state.trueWords[curWordPos].length
        ),
        correctLetters: state.correctLetters + 1,
      };
    }
    case ACTION.ADD_INCORRECT: {
      let newLetterStates: LetterTypeState[][] = [...state.letterStates];
      newLetterStates[curWordPos][curLetterPos] = LetterTypeState.INCORRECT;
      return {
        ...state,
        letterStates: newLetterStates,
        frontPos: getNextLetterPostion(
          curWordPos,
          curLetterPos,
          state.trueWords[curWordPos].length
        ),
        incorrectLetters: state.correctLetters + 1,
      };
    }
    case ACTION.REMOVE: {
      let prevWordLen = 0;
      if (curWordPos > 0) {
        prevWordLen = state.trueWords[curWordPos - 1].length;
      } else if (curWordPos <= 0) {
        prevWordLen = state.trueWords[curWordPos].length;
      }
      const prevPosition = getPreviousLetterPostion(
        curWordPos,
        curLetterPos,
        prevWordLen
      );
      const prevIsCorrect =
        LetterTypeState.CORRECT ===
        state.letterStates[prevPosition[0]][prevPosition[1]];
      let newLetterStates: LetterTypeState[][] = [...state.letterStates];
      newLetterStates[prevPosition[0]][prevPosition[1]] =
        LetterTypeState.NORMAL;
      return {
        ...state,
        letterStates: newLetterStates,
        frontPos: prevPosition,
        correctLetters: prevIsCorrect
          ? state.correctLetters - 1
          : state.correctLetters,
      };
    }
    case ACTION.RESET: {
      if (state.trueText) return { ...Initializer(state.trueText) };
      else throw Error("Initial state cannot be invalid when resetting.");
    }
    case ACTION.SET_LINE_HEIGHT: {
      if (action.payload?.lineHeight != undefined)
        return {
          ...state,
          curLineHeight: action.payload?.lineHeight,
        };
      else throw Error("Payload line height is missing.");
    }
    default:
      throw Error(`ERROR: Action ${action.type} does not exist`);
  }
};

export default function Home() {
  const initTrueText = useRef(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  );
  const [state, dispatch] = useReducer(
    reducer,
    initTrueText.current,
    Initializer
  );

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
    if (!offset) return;

    if (state.curLineHeight != offset) {
      dispatch({
        type: ACTION.SET_LINE_HEIGHT,
        payload: { lineHeight: offset },
      });
      wordsRef.current[state.frontPos[0]]?.scrollIntoView(true);
    }
  }, [state.frontPos]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const userText = e.target.value.split("");
    if (isPaused) setIsPaused(false);

    let didIncrease: boolean = userText.length > prevUserInputLength.current;

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
    focusInputEl();
  };

  const reset = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    setIsPaused(true);
    setTimer(initTime.current);
    dispatch({ type: ACTION.RESET });
    textAreaRef.current.value = "";
    canType.current = true;
    prevUserInputLength.current = 0;
    focusInputEl();
  };

  const focusInputEl = () => {
    textAreaRef.current.focus();
  };

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
      className="flex flex-col min-h-screen items-center justify-between p-10 bg-dark text-secondary font-roboto-mono"
      onClick={focusInputEl}
    >
      <UserContext.Provider value={state}>
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

          <div className="relative flex flex-wrap text-2xl select-none max-h-[6.2rem] overflow-y-scroll scrollbar">
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
              className={`absolute min-h-full min-w-full resize-none bg-transparent text-transparent selection:bg-transparent outline-none cursor-pointer scrollbar`}
              onChange={onTextChange}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              ref={textAreaRef}
              spellCheck={false}
              disabled={!canType.current}
            />
          </div>
          <a
            className="self-center p-2 rounded-full hover:bg-secondaryLowlight"
            href=""
            onClick={reset}
          >
            <Image src={"/redo.svg"} alt="redo" width={22} height={22} />
          </a>
        </div>

        <div></div>
      </UserContext.Provider>
    </main>
  );
}
