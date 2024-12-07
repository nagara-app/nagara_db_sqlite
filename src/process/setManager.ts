export class SetManager {
  public wordFormInfo: Set<string>;
  public wordMeaningPos: Set<string>;

  constructor() {
    this.wordFormInfo = new Set();
    this.wordMeaningPos = new Set();
  }
}

export const setManager = new SetManager();
