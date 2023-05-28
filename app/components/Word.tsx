import { Dispatch, forwardRef, useContext, useEffect } from "react";
import { UserContext } from "../page";

import Letter from "./Letter";
import { ActionType, ViewActionType, VIEW_ACTION } from "../types/contextTypes";

interface props {
  wordPos: number;
  viewDispatch: Dispatch<ViewActionType>;
}

const Word = forwardRef<HTMLDivElement, props>(
  ({ wordPos, viewDispatch }: props, ref) => {
    const { trueWords, frontPos, curLineHeight } = useContext(UserContext);

    useEffect(() => {
      if (curLineHeight != ref?.offsetTop)
        viewDispatch({
          type: VIEW_ACTION.NEXT_LINE,
          payload: { lineHeight: ref?.offsetTop },
        });
    }, [frontPos]);

    return (
      <div ref={ref} className="flex flex-row flex-wrap">
        {trueWords[wordPos]?.split("").map((_, letterPos) => (
          <Letter wordPos={wordPos} letterPos={letterPos} key={letterPos} />
        ))}
      </div>
    );
  }
);

export default Word;
