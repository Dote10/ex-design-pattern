import type { BtnType, GrimpanMenu } from './behavioral/command/GrimpanMenu.js';
import {
  ChromeGrimpanFactory,
  IEGrimpanFactory,
  type AbstractGrimpanFactory,
} from './abstract_factory/GrimpanFactory.js';
import type { GrimpanHistory } from './prototype/GrimpanHistory.js';
import {
  BackCommand,
  ForwardCommand,
  PenSelectCommand,
} from './behavioral/command/Command.js';
import {
  CircleMode,
  EraserMode,
  PenMode,
  PipetteMode,
  RectangleMode,
  type Mode,
} from './behavioral/state/Mode.js';

export interface GrimpanOption {
  menu: BtnType[];
}

export type GrimpanMode = 'pen' | 'circle' | 'rectangle' | 'eraser' | 'pipette'; //스포이드
export abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  menu: GrimpanMenu;
  history: GrimpanHistory;
  mode!: Mode;
  color: string;
  active: boolean;
  saveStrategy!: () => void;

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
    this.menu = factory.createGrimpanMenu(
      this,
      document.querySelector('#menu')!,
    );
    this.history = factory.createGrimpanHistory(this);
    this.color = '#000';
    this.active = false;
    this.setSaveStrategy('png');
  }

  setSaveStrategy(imageType: 'png' | 'jpg' | 'webp' | 'avif' | 'gif' | 'pdf') {
    switch (imageType) {
      case 'png': {
        this.saveStrategy = () => {
          const a = document.createElement('a');
          a.download = 'canvas.png';
          //a.href = this.grimpan.canvas.toDataURL('image/png');
          const dataURL = this.canvas.toDataURL('image/png');
          let url = dataURL.replace(
            /^data:image\/png/,
            'data:application/octet-stream',
          );
          a.href = url;
          a.click();
        };
        break;
      }
      case 'jpg': {
        this.saveStrategy = () => {
          const a = document.createElement('a');
          a.download = 'canvas.jpg';
          //a.href = this.grimpan.canvas.toDataURL('image/jpg');
          const dataURL = this.canvas.toDataURL('image/jpg');
          let url = dataURL.replace(
            /^data:image\/jpg/,
            'data:application/octet-stream',
          );
          a.href = url;
          a.click();
        };
        break;
      }
      case 'webp': {
        this.saveStrategy = () => {
          const a = document.createElement('a');
          a.download = 'canvas.webp';
          //a.href = this.grimpan.canvas.toDataURL('image/webp');
          const dataURL = this.canvas.toDataURL('image/webp');
          let url = dataURL.replace(
            /^data:image\/webp/,
            'data:application/octet-stream',
          );
          a.href = url;
          a.click();
        };
        break;
      }
      case 'avif': {
        this.saveStrategy = () => {};
        break;
      }
      case 'gif': {
        this.saveStrategy = () => {};
        break;
      }
      case 'pdf': {
        this.saveStrategy = () => {};
        break;
      }
    }
  }

  setMode(mode: GrimpanMode) {
    console.log(mode);
    switch (mode) {
      case 'pen': {
        this.mode = new PenMode(this);
        break;
      }
      case 'eraser': {
        this.mode = new EraserMode(this);
        break;
      }
      case 'pipette': {
        this.mode = new PipetteMode(this);
        break;
      }
      case 'rectangle': {
        this.mode = new RectangleMode(this);
        break;
      }
      case 'circle': {
        this.mode = new CircleMode(this);
        break;
      }
    }
  }

  setColor(color: string) {
    this.color = color;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  changeColor(color: string) {
    this.setColor(color);
    if (this.menu.colorInput) {
      this.menu.colorInput.value = color;
    }
  }

  abstract initialize(option: GrimpanOption): void;

  abstract onMousedown(e: MouseEvent): void;
  abstract onMousemove(e: MouseEvent): void;
  abstract onMouseup(e: MouseEvent): void;

  static getInstance() {}
}

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;
  initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu);
    this.history.initialize();
    this.canvas.addEventListener('mousedown', this.onMousedown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMousemove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseup.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseup.bind(this));
  }

  override onMousedown(e: MouseEvent): void {
    this.mode.mousedown(e);
  }
  override onMousemove(e: MouseEvent): void {
    this.mode.mousemove(e);
  }
  override onMouseup(): void {
    this.mode.mouseup();
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

  override onMousedown(e: MouseEvent): void {}
  override onMousemove(e: MouseEvent): void {}
  override onMouseup(e: MouseEvent): void {}

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
