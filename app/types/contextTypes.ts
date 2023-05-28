import { JsxElement } from "typescript";

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
}

export enum VIEW_ACTION {
  NEXT_LINE,
  PREV_LINE,
}

export type ActionType = {
  type: ACTION;
  payload?: {
    newTrueText?: string;
    lineHeight?: number;
  };
};

export type ViewActionType = {
  type: VIEW_ACTION;
  payload?: {};
};

export type StateType = {
  trueText: string;
  trueWords: string[];
  letterStates: LetterTypeState[][];
  frontPos: [number, number];
  correctLetters: number;
  incorrectLetters: number;
};

export type ViewStateType = {
  wordPos: number;
  prevLineHeight: number;
  curLineHeight: number;
};
