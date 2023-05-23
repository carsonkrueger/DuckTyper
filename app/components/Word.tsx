import Letter from "./Letter";

interface props {
  trueWord: string;
  userWord: string;
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

const Word = ({
  trueWord,
  userWord,
  addKeyPress,
  removeKeyPress,
  addErrorPress,
}: props) => {
  return (
    <div>
      {trueWord.split("").map((ch, idx) => (
        <Letter
          trueLetter={ch}
          userLetter={userWord[idx]}
          isFrontLetter
          addErrorPress={addErrorPress}
          removeKeyPress={removeKeyPress}
          addKeyPress={addKeyPress}
        />
      ))}
    </div>
  );
};
