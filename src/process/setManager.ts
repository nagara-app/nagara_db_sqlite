export class SetManager {
  public wordFormInfo: Set<string>;

  constructor() {
    this.wordFormInfo = new Set();
  }
}

export const setManager = new SetManager();
