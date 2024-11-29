export class SetManager {
  public wordKanaInfoSet: Set<string>;
  public wordKanjiInfoSet: Set<string>;

  constructor() {
    this.wordKanaInfoSet = new Set();
    this.wordKanjiInfoSet = new Set();
  }
}

export const setManager = new SetManager();
