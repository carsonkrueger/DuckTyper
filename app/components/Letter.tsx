import { useEffect, useRef, useState } from "react";

import { letterType } from "../types/letterTypes";

interface props {
  trueLetter: string;
  userLetter: string;
  isFrontLetter: boolean;
  addKeyPress: (lType: letterType) => void;
  removeKeyPress: (lType: letterType) => void;
}

const Letter = ({
  trueLetter,
  userLetter,
  isFrontLetter,
  addKeyPress,
  removeKeyPress,
}: props) => {
  const [style, setStyle] = useState<string>("text-secondary");
  const needToAdd = useRef(true);
  // const prevUserLetter = useRef<string | null>(null);
  // const prevMatching = useRef<boolean | null>(null);
  //   const isMatching = useRef<boolean>(userLetter === trueLetter);

  useEffect(() => {
    let isMatching = null;
    if (userLetter) {
      isMatching = userLetter === trueLetter;
    }

    switch (isMatching) {
      case true:
        if (needToAdd.current) {
          addKeyPress(letterType.CORRECT);
          needToAdd.current = false;
        }
        setStyle("text-gray-200");
        break;
      case false:
        setStyle("text-red-500");
        break;
      case null:
        if (!needToAdd.current) {
          removeKeyPress(letterType.INCORRECT);
          needToAdd.current = true;
        }
        setStyle("text-secondary");
        break;
    }
  }, [userLetter]);

  return (
    <div
      className={`border-l-[1px] ${
        isFrontLetter ? "border-l-primary" : "border-l-dark"
      } ${style}`}
    >
      {trueLetter === " " ? <>&nbsp;</> : trueLetter}
    </div>
  );
};

export default Letter;
