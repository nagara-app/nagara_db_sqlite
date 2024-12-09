export class SetManager {
  public wordFormInfo: Set<string>;
  public wordMeaningPos: Set<string>;
  public wordMeaningField: Set<string>;
  public wordMeaningMisc: Set<string>;
  public wordMeaningDial: Set<string>;
  public wordTranslationType: Set<string>;

  constructor() {
    this.wordFormInfo = new Set();
    this.wordMeaningPos = new Set();
    this.wordMeaningField = new Set();
    this.wordMeaningMisc = new Set();
    this.wordMeaningDial = new Set();
    this.wordTranslationType = new Set();
  }
}

export const setManager = new SetManager();
