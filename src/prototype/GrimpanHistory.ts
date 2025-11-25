import type { Grimpan } from '../Grimpan';

interface Clonable {
  clone(): Clonable;
}

class HistoryStack extends Array implements Clonable {
  clone() {
    return this.slice() as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
  }

  abstract initialize(): void;
  abstract undo(): void;
  abstract redo(): void;

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;
  override initialize() {}
  override undo(): void {}
  override redo(): void {}

  static override getInstance(grimpan: Grimpan): IEGrimpanHistory {
    if (!this.instance) {
      return new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;
  override initialize() {}
  override undo(): void {}
  override redo(): void {}

  static override getInstance(grimpan: Grimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      return new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
