export enum LetterTypeState {
  NORMAL,
  CORRECT,
  INCORRECT,
}

export interface IWord {
  wordPos: number;
  trueWord: string;
}

export type ContextType = {
  trueWords: IWord[];
  letterStates: LetterTypeState[][];
  frontPos: [number, number];
};
