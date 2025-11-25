import { GrimpanMenuBtn2 } from '../builder/GrimpanMenuBtn.js';
import {
  GrimpanMenuBtn,
  GrimpanMenuInput,
} from '../builder/GrimpanMenuElement';
import type { Grimpan } from '../Grimpan.js';

export abstract class GrimpanMenu {
  protected constructor(
    public grimpan: Grimpan,
    public dom: HTMLElement,
  ) {}

  abstract initialize(types: BtnType[]): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

class BackCommand {
  name: string;
  constructor(name: BtnType) {
    this.name = name;
  }
}

type BtnType =
  | 'pen'
  | 'circle'
  | 'rectangle'
  | 'eraser'
  | 'back'
  | 'forward'
  | 'save'
  | 'pipette' //스포이드
  | 'color';

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;
  override initialize(types: BtnType[]): void {
    types.forEach(this.drawButtonByType.bind(this));
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case 'back': {
        const btn = new GrimpanMenuBtn2.Builder(this, '뒤로', 'button').build();
        btn.draw();
        return;
      }
      case 'forward': {
        const btn = new GrimpanMenuBtn2.Builder(
          this,
          '앞으로',
          'button',
        ).build();
        btn.draw();
        return;
      }
      case 'color': {
        // const btn = new GrimpanMenuInput.Builder(this, '컬러').build();
        // btn.draw();
        // return;
      }
      case 'pipette': {
        const btn = new GrimpanMenuBtn2.Builder(
          this,
          '스포이드',
          'button',
        ).build();
        btn.draw();
        return;
      }
      case 'eraser': {
        const btn = new GrimpanMenuBtn2.Builder(
          this,
          '지우개',
          'button',
        ).build();
        btn.draw();
      }
      case 'pen': {
        const btn = new GrimpanMenuBtn2.Builder(this, '펜', 'button').build();
        btn.draw();
        return;
      }
      case 'circle': {
        const btn = new GrimpanMenuBtn2.Builder(this, '원', 'button').build();
        btn.draw();
        return;
      }
      case 'rectangle': {
        const btn = new GrimpanMenuBtn2.Builder(this, '사각형', 'button')
          .setOnClick(() => {
            //사각형 그리기 작업
          })
          .build();
        btn.draw();
        return;
      }
      case 'save': {
        const btn = new GrimpanMenuBtn2.Builder(this, '저장', 'button')
          .setOnClick(() => {
            //저장 작업
          })
          .build();
        btn.draw();
        return;
      }
    }
  }

  static override getInstance(
    grimpan: Grimpan,
    dom: HTMLElement,
  ): ChromeGrimpanMenu {
    if (!this.instance) {
      return (this.instance = new ChromeGrimpanMenu(grimpan, dom));
    }
    return this.instance;
  }
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;
  override initialize(): void {}
  static override getInstance(
    grimpan: Grimpan,
    dom: HTMLElement,
  ): IEGrimpanMenu {
    if (!this.instance) {
      return (this.instance = new IEGrimpanMenu(grimpan, dom));
    }
    return this.instance;
  }
}
