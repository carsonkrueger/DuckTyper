import { useEffect, useState } from "react";

interface props {
  trueLetter: string;
  userLetter: string;
  addKeyPress: () => void;
}

const Letter = ({ trueLetter, userLetter, addKeyPress }: props) => {
  const [color, setColor] = useState<string>("text-secondary");
  //   const isMatching = useRef<boolean>(userLetter === trueLetter);

  useEffect(() => {
    let isMatching = null;
    if (userLetter) {
      isMatching = userLetter === trueLetter;
    }

    switch (isMatching) {
      case true:
        addKeyPress();
        setColor("text-gray-200");
        break;
      case false:
        setColor("text-red-500");
        break;
      default:
        setColor("text-secondary");
        break;
    }
  }, [userLetter]);

  return (
    <div className={`${color}`}>
      {trueLetter === " " ? <>&nbsp;</> : trueLetter}
    </div>
  );
};

export default Letter;
