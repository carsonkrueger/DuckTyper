import { ACTION, ActionType, LetterTypeState, StateType } from "@/types/types";
import { createContext } from "react";

const randomWords = require("random-words");

export const UserContext = createContext<StateType | null>(null);

const MAX_WORDS = 60;

const generateNumWords = (numWords: number, mode: number): string => {
  let maxLen = 0;
  switch (mode) {
    case 0:
    case 1:
      maxLen = 6;
      break;
    case 2:
      maxLen = 9;
      break;
    case 3:
      maxLen = 14;
      break;
  }

  return randomWords({
    exactly: 1,
    wordsPerString: numWords,
    join: " ",
    maxLength: maxLen,
  });
};

const Initializer = (numWords: number, mode: number): StateType => {
  const newTrueText = generateNumWords(numWords, mode);
  return {
    trueText: newTrueText,
    trueWords: newTrueText.split(" ").map((word) => word.concat(" ")),
    letterStates: newTrueText.split(" ").map((word) =>
      word
        .concat(" ")
        .split("")
        .map((_) => LetterTypeState.NORMAL)
    ),
    frontPos: [0, 0],
    correctLetters: 0,
    incorrectLetters: 0,
    lastLineBreak: 0,
    curLineHeight: 0,
  };
};

const getNextLetterPostion = (
  curWordPos: number,
  curLetterPos: number,
  curWordLen: number,
  totalWords: number
): [number, number] => {
  if (curLetterPos >= curWordLen - 1) {
    if (curWordPos >= totalWords - 1) return [curWordPos, curLetterPos]; // cannot go forward further
    return [curWordPos + 1, 0];
  } else return [curWordPos, curLetterPos + 1];
};

const getPreviousLetterPostion = (
  curWordPos: number,
  curLetterPos: number,
  prevWordLen: number
): [number, number] => {
  if (curLetterPos <= 0) {
    if (curWordPos <= 0) return [curWordPos, curLetterPos]; // cannot go back further
    return [curWordPos - 1, prevWordLen - 1];
  } else return [curWordPos, curLetterPos - 1];
};

export const reducer = (state: StateType, action: ActionType): StateType => {
  let curWordPos = state.frontPos[0];
  let curLetterPos = state.frontPos[1];
  switch (action.type) {
    case ACTION.INIT: {
      if (action.payload?.curMode === undefined)
        throw Error("Mode payload cannot be empty");
      return Initializer(MAX_WORDS, action.payload.curMode);
    }
    case ACTION.ADD_CORRECT: {
      let newLetterStates: LetterTypeState[][] = [...state.letterStates];
      newLetterStates[curWordPos][curLetterPos] = LetterTypeState.CORRECT;
      return {
        ...state,
        letterStates: newLetterStates,
        frontPos: getNextLetterPostion(
          curWordPos,
          curLetterPos,
          state.trueWords[curWordPos].length,
          state.trueWords.length
        ),
        correctLetters: state.correctLetters + 1,
      };
    }
    case ACTION.ADD_INCORRECT: {
      let newLetterStates: LetterTypeState[][] = [...state.letterStates];
      newLetterStates[curWordPos][curLetterPos] = LetterTypeState.INCORRECT;
      return {
        ...state,
        letterStates: newLetterStates,
        frontPos: getNextLetterPostion(
          curWordPos,
          curLetterPos,
          state.trueWords[curWordPos].length,
          state.trueWords.length
        ),
        incorrectLetters: state.incorrectLetters + 1,
      };
    }
    case ACTION.REMOVE: {
      let prevWordLen = 0;
      if (curWordPos > 0) {
        prevWordLen = state.trueWords[curWordPos - 1].length;
      } else if (curWordPos <= 0) {
        prevWordLen = state.trueWords[curWordPos].length;
      }
      const prevPosition = getPreviousLetterPostion(
        curWordPos,
        curLetterPos,
        prevWordLen
      );
      const prevIsCorrect =
        LetterTypeState.CORRECT ===
        state.letterStates[prevPosition[0]][prevPosition[1]];
      let newLetterStates: LetterTypeState[][] = [...state.letterStates];
      newLetterStates[prevPosition[0]][prevPosition[1]] =
        LetterTypeState.NORMAL;
      return {
        ...state,
        letterStates: newLetterStates,
        frontPos: prevPosition,
        correctLetters: prevIsCorrect
          ? state.correctLetters - 1
          : state.correctLetters,
      };
    }
    case ACTION.RESET: {
      if (state.trueText)
        return {
          ...state,
          trueWords: state.trueText.split(" ").map((word) => word.concat(" ")),
          letterStates: state.trueText.split(" ").map((word) =>
            word
              .concat(" ")
              .split("")
              .map((_) => LetterTypeState.NORMAL)
          ),
          frontPos: [0, 0],
          correctLetters: 0,
          incorrectLetters: 0,
          lastLineBreak: 0,
          curLineHeight: 0,
        };
      else
        throw Error(
          "Initial state true text cannot be invalid when resetting."
        );
    }
    case ACTION.SET_NEW_LINE: {
      if (action.payload?.lineHeight != undefined)
        return {
          ...state,
          lastLineBreak: state.frontPos[0],
          curLineHeight: action.payload?.lineHeight,
        };
      else throw Error("Payload line height is missing.");
    }
    case ACTION.CONSOLIDATE: {
      let newTrueWords = [...state.trueWords];
      newTrueWords.splice(0, state.lastLineBreak);
      let newLetterStates = [...state.letterStates];
      newLetterStates.splice(0, state.lastLineBreak);
      return {
        ...state,
        trueWords: newTrueWords,
        letterStates: newLetterStates,
        frontPos: [state.frontPos[0] - state.lastLineBreak, state.frontPos[1]],
        lastLineBreak: 0,
      };
    }
    case ACTION.GENERATE: {
      if (action.payload?.curMode === undefined)
        throw Error("Mode payload cannot be empty");
      const numWords = MAX_WORDS - state.trueWords.length;
      const additionalTrueWords = generateNumWords(
        numWords,
        action.payload.curMode
      )
        .split(" ")
        .map((word) => word.concat(" "));
      const additionalLetterStates = additionalTrueWords.map((word) =>
        word.split("").map((_) => LetterTypeState.NORMAL)
      );
      return {
        ...state,
        trueWords: state.trueWords.concat(additionalTrueWords),
        letterStates: state.letterStates.concat(additionalLetterStates),
      };
    }
    default:
      throw Error(`ERROR: Action ${action.type} does not exist`);
  }
};
