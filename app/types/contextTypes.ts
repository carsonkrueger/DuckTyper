export enum LetterTypeState {
  NORMAL,
  CORRECT,
  INCORRECT,
}

export interface IWord {
  wordPos: number;
  trueWord: string;
}

// export type ContextType = {
//   trueWords: IWord[];
//   letterStates: LetterTypeState[][];
//   frontPos: [number, number];
// };

export enum ACTION {
  ADD_CORRECT,
  ADD_INCORRECT,
  REMOVE,
  RESET,
  INIT,
}

export type ActionType = {
  type: ACTION;
  payload?: {
    newState?: StateType;
  };
};

export type StateType = {
  trueText: string;
  userText: string;
  trueWords: string[];
  letterStates: LetterTypeState[][];
  frontPos: [number, number];
};
