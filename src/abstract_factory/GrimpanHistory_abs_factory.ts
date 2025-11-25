import type { Grimpan } from '../Grimpan.js';

export abstract class GrimpanHistory {
  protected constructor(grimpan: Grimpan) {}
  abstract initialize(): void;
  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;
  override initialize() {}
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
  static override getInstance(grimpan: Grimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      return new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
