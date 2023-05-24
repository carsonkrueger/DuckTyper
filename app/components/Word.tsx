import { useContext } from "react";
import { UserContext } from "../page";

import Letter from "./Letter";

interface props {
  wordPos: number;
}

const Word = ({ wordPos }: props) => {
  const { trueWords } = useContext(UserContext);

  return (
    <div className="flex flex-row flex-wrap">
      {trueWords
        .at(wordPos)
        ?.trueWord.split("")
        .map((_, letterPos) => (
          <Letter wordPos={wordPos} letterPos={letterPos} key={letterPos} />
        ))}
    </div>
  );
};

export default Word;
