import { useEffect, useRef, useState } from "react";

import { letterType } from "../types/letterTypes";

interface props {
  trueLetter: string;
  userLetter: string;
  isFrontLetter: boolean;
  addKeyPress: () => void;
  removeKeyPress: () => void;
}

const Letter = ({
  trueLetter,
  userLetter,
  isFrontLetter,
  addKeyPress,
  removeKeyPress,
}: props) => {
  const [color, setColor] = useState<string>("text-secondary");
  const [border, setBorder] = useState<string>("border-l-dark");
  const needToAdd = useRef(true);
  const firstRun = useRef(false);
  // const prevUserLetter = useRef<string | null>(null);
  // const prevMatching = useRef<boolean | null>(null);
  //   const isMatching = useRef<boolean>(userLetter === trueLetter);

  useEffect(() => {
    if (firstRun.current === false) {
      firstRun.current = true;
      return;
    }

    let isMatching = null;
    if (userLetter) {
      isMatching = userLetter === trueLetter;
    }

    // switch (isMatching) {
    //   case true:
    //     if (needToAdd.current) {
    //       addKeyPress(letterType.CORRECT);
    //       needToAdd.current = false;
    //     }
    //     setColor("text-gray-200");
    //     break;
    //   case false:
    //     addKeyPress(letterType.INCORRECT);
    //     setColor("text-red-600");
    //     break;
    //   case null:
    //     if (!needToAdd.current) {
    //       removeKeyPress(letterType.INCORRECT);
    //       needToAdd.current = true;
    //     } else if (needToAdd.current) {
    //       removeKeyPress(letterType.CORRECT);
    //     }
    //     setColor("text-secondary");
    //     break;
    // }

    switch (isMatching) {
      case true:
        if (needToAdd.current) {
          addKeyPress();
          needToAdd.current = false;
        }
        setColor("text-gray-200");
        break;
      case false:
        setColor("text-red-600");
        break;
      case null:
        if (!needToAdd.current) {
          removeKeyPress();
          needToAdd.current = true;
        }
        setColor("text-secondary");
        break;
    }
  }, [userLetter]);

  return (
    <div className={`border-l-[1px] ${border} ${color}`}>
      {trueLetter === " " ? <>&nbsp;</> : trueLetter}
    </div>
  );
};

export default Letter;
