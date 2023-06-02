import { forwardRef, useContext, useEffect, useRef } from "react";
import { UserContext } from "@/redux/store";

import Letter from "./Letter";
import { StateType } from "../../types/types";

interface props {
  wordPos: number;
}

const Word = forwardRef<HTMLDivElement, props>(({ wordPos }: props, ref) => {
  const { trueWords } = useContext(UserContext) as StateType;

  return (
    <div ref={ref} className="flex flex-row flex-wrap">
      {trueWords[wordPos]?.split("").map((_, letterPos) => (
        <Letter wordPos={wordPos} letterPos={letterPos} key={letterPos} />
      ))}
    </div>
  );
});
Word.displayName = "Word";

export default Word;
