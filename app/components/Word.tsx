import Letter from "./Letter";
import { IWord } from "../types/contextTypes";

import { UserContext } from "../page";
import { useContext } from "react";

const { trueWords } = useContext(UserContext);

interface props {
  wordPos: number;
}

const Word = ({ wordPos }: props) => {
  return (
    <div className="flex flex-row flex-wrap">
      {trueWords
        .at(wordPos)
        ?.trueWord.split("")
        .map((_, letterPos) => (
          <Letter wordPos={wordPos} letterPos={letterPos} />
        ))}
    </div>
  );
};

export default Word;
