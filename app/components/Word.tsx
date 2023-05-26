import { Dispatch, useContext, useEffect, useRef } from "react";
import { UserContext } from "../page";

import Letter from "./Letter";
import { ACTION, ActionType } from "../types/contextTypes";

interface props {
  wordPos: number;
  dispatch: Dispatch<ActionType>;
}

const Word = ({ wordPos, dispatch }: props) => {
  const { trueWords, frontPos, curLineHeight } = useContext(UserContext);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (curLineHeight != wordRef.current?.offsetTop)
      dispatch({
        type: ACTION.NEW_LINE,
        payload: { lineHeight: wordRef.current?.offsetTop },
      });
  }, [frontPos]);

  return (
    <div ref={wordRef} className="flex flex-row flex-wrap">
      {trueWords[wordPos]?.split("").map((_, letterPos) => (
        <Letter wordPos={wordPos} letterPos={letterPos} key={letterPos} />
      ))}
    </div>
  );
};

export default Word;
