import {
  ChromeGrimpanMenu,
  IEGrimpanMenu,
  type GrimpanMenu,
} from '../behavioral/command/GrimpanMenu.js';
import { ChromeGrimpan, IEGrimpan, type Grimpan } from '../Grimpan.js';

import {
  ChromeGrimpanHistory,
  IEGrimpanHistory,
  type GrimpanHistory,
} from '../prototype/GrimpanHistory.js';

export abstract class AbstractGrimpanFactory {
  //case 2 반화하는 값이
  // 싱클톤 패턴을 하용한 객체 인스턴스이기 때문에 사용하는 함수
  static createGrimpan(): Grimpan {
    throw new Error('하위 클래스에서 구현해 주세요.');
  }
  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement): GrimpanMenu {
    throw new Error('하위 클래스에서 구현해 주세요.');
  }
  static createGrimpanHistory(grimpan: Grimpan): GrimpanHistory {
    throw new Error('하위 클래스에서 구현해 주세요.');
  }

  //case 1 일반적인 경우
  /* abstract createGrimpan(): Grimpan */

  //case 3 인스턴스이기 때문에 사용하는 함수에서
  //LSP 리스코프 치환원칙을 어기게 되기 때문에 사용하는 함수
  /*  static createGrimpan(): Grimpan {
    return Grimpan.getInstance() as unknown as Grimpan
  } */
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan(): Grimpan {
    return IEGrimpan.getInstance();
  }

  static override createGrimpanMenu(
    grimpan: Grimpan,
    dom: HTMLElement,
  ): GrimpanMenu {
    return IEGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: Grimpan): GrimpanHistory {
    return IEGrimpanHistory.getInstance(grimpan);
  }
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan(): Grimpan {
    return ChromeGrimpan.getInstance();
  }

  static override createGrimpanMenu(
    grimpan: Grimpan,
    dom: HTMLElement,
  ): GrimpanMenu {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: Grimpan): ChromeGrimpanHistory {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}
