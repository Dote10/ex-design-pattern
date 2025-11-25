import type { BtnType, GrimpanMenu } from './GrimpanMenu.js';
import {
  ChromeGrimpanFactory,
  IEGrimpanFactory,
  type AbstractGrimpanFactory,
} from '../../abstract_factory/GrimpanFactory.js';
import type { GrimpanHistory } from '../../prototype/GrimpanHistory.js';
import { BackCommand, ForwardCommand } from './Command.js';

/** 
export interface GrimpanOption {
  menu: BtnType[];
}

export type GrimpanMode = 'pen' | 'circle' | 'rectangle' | 'eraser' | 'pipette'; //스포이드
export abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  menu: GrimpanMenu;
  history: GrimpanHistory;
  mode?: GrimpanMode;
  protected constructor(
    canvas: HTMLElement | null,
    factory: typeof AbstractGrimpanFactory,
  ) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas엘리먼트를 입력하세요.');
    }
    this.canvas = canvas;
    //<canvas>요소에 2차원 그래픽을 그릴 수 있는 환경(Context)을 준비
    this.ctx = this.canvas.getContext('2d')!;
    this.menu = factory.createGrimpanMenu(this 
      document.querySelector('#menu')!,
    );
    this.history = factory.createGrimpanHistory(this);
    //this.mode = 'pen';
  }

  abstract initialize(option: GrimpanOption): void;

  setMode(mode: GrimpanMode) {
    console.log(mode);
    this.mode = mode;
  }

  static getInstance() {}
}

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;
  initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu);
    this.history.initialize();
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      console.log(e);

      if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
        this.menu.executeCommand(new ForwardCommand(this.history));
      }

      if (e.code === 'KeyZ' && e.ctrlKey) {
        this.menu.executeCommand(new BackCommand(this.history));
      }
    });
  }

  static override getInstance() {
    if (!this.instance) {
      return (this.instance = new ChromeGrimpan(
        document.querySelector('canvas'),
        ChromeGrimpanFactory,
      ));
    }
    return this.instance;
  }
}

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;
  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      return (this.instance = new IEGrimpan(
        document.querySelector('canvas'),
        IEGrimpanFactory,
      ));
    }
    return this.instance;
  }
}
*/
