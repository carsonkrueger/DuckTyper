import { UserContext } from "../page";
import { useContext, useEffect, useRef, useState } from "react";

import { LetterTypeState } from "../types/contextTypes";

const {
  trueWords,
  frontPos,
  addCorrectKeyPress,
  removeCorrectKeyPress,
  addErrorKeyPress,
} = useContext(UserContext);

interface props {
  wordPos: number;
  letterPos: number;
}

const Letter = ({ wordPos, letterPos }: props) => {
  const [color, setColor] = useState<string>("text-secondary");
  const [border, setBorder] = useState<string>("border-l-dark");
  const needToAdd = useRef(true);
  const firstRun = useRef(false);
  const trueLetter = useRef(trueWords[wordPos].trueWord[letterPos]);
  const letterTypeState = useRef(trueWords[wordPos].letterStates[letterPos]);

  useEffect(() => {
    if (firstRun.current === false) {
      firstRun.current = true;
      return;
    }

    switch (letterTypeState.current) {
      case LetterTypeState.CORRECT:
        if (needToAdd.current) {
          addCorrectKeyPress();
          needToAdd.current = false;
        }
        setColor("text-gray-200");
        break;
      case LetterTypeState.INCORRECT:
        addErrorKeyPress();
        if (trueLetter.current === " ")
          setColor("text-red-500 border-b-red-500");
        else setColor("text-red-500");
        break;
      case LetterTypeState.NORMAL:
        if (!needToAdd.current) {
          removeCorrectKeyPress();
          needToAdd.current = true;
        }
        setColor("text-secondary");
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (isFrontLetter) setBorder("border-l-primary");
    else setBorder("border-l-dark");
  }, [isFrontLetter]);

  return (
    <div
      className={`border-l-[1px] border-b-[1px] border-b-dark ${border} ${color}`}
    >
      {trueLetter.current === " " ? <>&nbsp;</> : trueLetter.current}
    </div>
  );
};

export default Letter;
