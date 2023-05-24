import { TupleType } from "typescript";

export enum LetterTypeState {
  NORMAL,
  CORRECT,
  INCORRECT,
}

export interface IWord {
  wordPos: number;
  trueWord: string;
  letterStates: LetterTypeState[];
}

export type ContextType = {
  trueWords: IWord[];
  frontPos: [number, number];
  addCorrectKeyPress: () => void;
  removeCorrectKeyPress: () => void;
  addErrorKeyPress: () => void;
};
