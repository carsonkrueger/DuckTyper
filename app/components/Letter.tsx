import { useEffect, useRef } from "react";
import { letterType } from "../types/letterTypes";

interface props {
  letter: string;
  LType?: letterType;
}

const Letter = ({ letter, LType }: props) => {
  const color = useRef<string>("text-secondary");
  useEffect(() => {
    switch (LType) {
      case letterType.CORRECT:
        color.current = "text-green-500";
        break;
      case letterType.INCORRECT:
        color.current = "text-red-500";
        break;
      default:
        break;
    }
  }, []);
  return (
    <div className={`${color.current}`}>
      {letter === " " ? <>&nbsp;</> : letter}
    </div>
  );
};

export default Letter;
