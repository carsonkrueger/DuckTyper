import Letter from "./Letter";

interface props {
  word: string;
  addKeyPress: () => void;
  removeKeyPress: () => void;
  addErrorPress: () => void;
}

// LETTER PROPS:
// interface props {
//   trueLetter: string;
//   userLetter: string;
//   isFrontLetter: boolean;
//   addKeyPress: () => void;
//   removeKeyPress: () => void;
//   addErrorPress: () => void;
// }

const Word = ({ word }: props) => {
  return (
    <div>
      {word.split("").map(() => (
        <Letter />
      ))}
    </div>
  );
};
