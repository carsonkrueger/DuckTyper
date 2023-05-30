import { forwardRef, useContext, useEffect, useRef } from "react";
import { UserContext } from "../page";

import Letter from "./Letter";
import { StateType } from "../types/contextTypes";

interface props {
  wordPos: number;
}

const Word = forwardRef<HTMLDivElement, props>(({ wordPos }: props, ref) => {
  const { trueWords } = useContext(UserContext) as StateType;
  // const trueWord = useRef<string>("");

  // useEffect(() => {
  //   if (trueWords[wordPos] != undefined)
  //     trueWord.current = trueWords[wordPos];
  // }, [trueWords])

  return (
    <div ref={ref} className="border border-orange-800 flex flex-row flex-wrap">
      {trueWords[wordPos]?.split("").map((_, letterPos) => (
        <Letter wordPos={wordPos} letterPos={letterPos} key={letterPos} />
      ))}
    </div>
  );
});
Word.displayName = "Word";

export default Word;
