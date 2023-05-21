import { useEffect, useRef, useState } from "react";

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
          addKeyPress();
          needToAdd.current = false;
        }
        setStyle("text-gray-200");
        break;
      case false:
        setStyle("text-red-500");
        break;
      case null:
        if (!needToAdd.current) {
          removeKeyPress();
          needToAdd.current = true;
        }
        setStyle("text-secondary");
        break;
    }
  }, [userLetter]);

  return (
    <div
      className={` border-0 border-l-[1px] border-l-${
        isFrontLetter ? "primary" : "dark"
      } ${style}`}
    >
      {trueLetter === " " ? <>&nbsp;</> : trueLetter}
    </div>
  );
};

export default Letter;
