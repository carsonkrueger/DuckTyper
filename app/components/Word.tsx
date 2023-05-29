import { forwardRef, useContext } from "react";
import { UserContext } from "../page";

import Letter from "./Letter";

interface props {
  wordPos: number;
}

const Word = forwardRef<HTMLDivElement, props>(({ wordPos }: props, ref) => {
  const { trueWords } = useContext(UserContext);

  return (
    <div ref={ref} className="flex flex-row flex-wrap">
      {trueWords[wordPos]?.split("").map((_, letterPos) => (
        <Letter wordPos={wordPos} letterPos={letterPos} key={letterPos} />
      ))}
    </div>
  );
});

export default Word;
