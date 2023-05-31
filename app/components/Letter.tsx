import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../page";

import { LetterTypeState, StateType } from "../types/contextTypes";

interface props {
  wordPos: number;
  letterPos: number;
}

const Letter = ({ wordPos, letterPos }: props) => {
  const { letterStates, trueWords, frontPos } = useContext(
    UserContext
  ) as StateType;

  const [color, setColor] = useState<string>("text-secondary");
  const [border, setBorder] = useState<string>("border-l-dark");

  useEffect(() => {
    switch (letterStates[wordPos][letterPos]) {
      case LetterTypeState.CORRECT:
        setColor("text-gray-200");
        break;
      case LetterTypeState.INCORRECT:
        if (trueWords[wordPos][letterPos] === " ")
          setColor("text-red-500 border-b-red-500");
        else setColor("text-red-500");
        break;
      case LetterTypeState.NORMAL:
        setColor("text-secondary");
        break;
    }

    const isFront = frontPos[0] === wordPos && frontPos[1] === letterPos;
    if (isFront) setBorder("border-l-primary");
    else setBorder("border-l-dark");
  }, [letterStates]);

  return (
    <div
      className={` border-l-[1px] border-b-[1px] border-b-dark ${border} ${color}`}
    >
      {trueWords[wordPos][letterPos] === " " ? (
        <>&nbsp;</>
      ) : (
        trueWords[wordPos][letterPos]
      )}
    </div>
  );
};

export default Letter;
