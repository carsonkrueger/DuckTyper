import { useEffect, useRef, useState } from "react";

interface props {
  trueLetter: string;
  userLetter: string;
  isFrontLetter: boolean;
  addKeyPress: () => void;
  removeKeyPress: () => void;
  addErrorPress: () => void;
}

const Letter = ({
  trueLetter,
  userLetter,
  isFrontLetter,
  addKeyPress,
  removeKeyPress,
  addErrorPress,
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

    switch (isMatching) {
      case true:
        if (needToAdd.current) {
          addKeyPress();
          needToAdd.current = false;
        }
        setColor("text-gray-200");
        break;
      case false:
        addErrorPress();
        if (trueLetter === " ") setColor("text-red-500 border-b-red-500");
        else setColor("text-red-500");
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

  useEffect(() => {
    if (isFrontLetter) setBorder("border-l-primary");
    else setBorder("border-l-dark");
  }, [isFrontLetter]);

  return (
    <div
      className={`border-l-[1px] border-b-[1px] border-b-dark ${border} ${color}`}
    >
      {trueLetter === " " ? <>&nbsp;</> : trueLetter}
    </div>
  );
};

export default Letter;
