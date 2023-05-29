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
  RESET,
  INIT,
  SET_LINE_HEIGHT,
}

export type ActionType = {
  type: ACTION;
  payload?: {
    newTrueText?: string;
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
  curLineHeight: number;
};
