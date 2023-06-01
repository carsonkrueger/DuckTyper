export enum LetterTypeState {
  NORMAL,
  CORRECT,
  INCORRECT,
}

export interface IWord {
  wordPos: number;
  trueWord: string;
}

export enum ACTION {
  ADD_CORRECT,
  ADD_INCORRECT,
  REMOVE,
  CONSOLIDATE,
  GENERATE,
  RESET,
  INIT,
  SET_NEW_LINE,
}

export type ActionType = {
  type: ACTION;
  payload?: {
    lineHeight?: number;
  };
};

export type StateType = {
  trueText: string;
  trueWords: string[];
  letterStates: LetterTypeState[][];
  frontPos: [number, number];
  correctLetters: number;
  incorrectLetters: number;
  lastLineBreak: number;
  curLineHeight: number;
};
