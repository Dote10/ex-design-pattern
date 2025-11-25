import {
  GrimpanMenuBtn,
  GrimpanMenuInput,
} from '../../builder/GrimpanMenuElement.js';
import type { Grimpan, GrimpanMode, GrimpanOption } from '../../Grimpan.js';
import { EraserMode, PenMode, type Mode } from '../state/Mode.js';
import {
  BackCommand,
  CircleSelectCommand,
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
  SaveCommnad,
  type Command,
} from './Command.js';

export abstract class GrimpanMenu {
  colorInput!: HTMLInputElement;
  protected constructor(
    public grimpan: Grimpan,
    public dom: HTMLElement,
  ) {}

  abstract initialize(types: BtnType[]): void;

  abstract setActiveBtn(type: GrimpanMode): void;

  abstract executeCommand(command: Command): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

export type BtnType =
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
    //this.setActiveBtn('pen');
    this.grimpan.setMode('pen');
  }

  override setActiveBtn(type: GrimpanMode) {
    document.querySelector('.active')?.classList.remove('active');
    document.querySelector(`#${type}-btn`)?.classList.add('active');
    //this.grimpan.setMode(type);
  }

  executeCommand(command: Command) {
    //비활성화 로직
    /*   if (disable){
       return;
    } */

    // Invoker가 명령 실행

    command.execute();
  }

  onSave() {
    this.executeCommand(new SaveCommnad(this.grimpan));
  }

  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history));
  }

  onClickPen() {
    const command = new PenSelectCommand(this.grimpan);
    //this.executeCommand(command);
    this.grimpan.setMode('pen');
    this.grimpan.history.stack.push(command);
  }

  onClickEraser() {
    this.grimpan.setMode('eraser');
    //this.executeCommand(new EraserSelectCommand(this.grimpan));
  }

  onClickRectangle() {
    //this.executeCommand(new RectangleSelectCommand(this.grimpan));
    this.grimpan.setMode('rectangle');
  }

  onClickCircle() {
    //this.executeCommand(new CircleSelectCommand(this.grimpan));
    this.grimpan.setMode('circle');
  }

  onClickPipette() {
    //this.executeCommand(new PipetteSelectCommand(this.grimpan));
    this.grimpan.setMode('pipette');
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case 'back': {
        const btn = new GrimpanMenuBtn.Builder(this, '뒤로', type)
          .setOnClick(this.onClickBack.bind(this))
          .build();
        btn.draw();
        return;
      }
      case 'forward': {
        const btn = new GrimpanMenuBtn.Builder(this, '앞으로', type)
          .setOnClick(() => {})
          .build();
        btn.draw();
        return;
      }
      case 'color': {
        const btn = new GrimpanMenuInput.Builder(this, '컬러', type)
          .setOnChange((e: Event) => {
            this.grimpan.setColor((e.target as HTMLInputElement).value);
          })
          .build();
        btn.draw();
        return;
      }
      case 'pipette': {
        const btn = new GrimpanMenuBtn.Builder(this, '스포이드', type)
          .setOnClick(this.onClickPipette.bind(this))
          .build();
        btn.draw();
        return;
      }
      case 'eraser': {
        const btn = new GrimpanMenuBtn.Builder(this, '지우개', type)
          .setOnClick(this.onClickEraser.bind(this))
          .build();
        btn.draw();
        return;
      }
      case 'pen': {
        const btn = new GrimpanMenuBtn.Builder(this, '펜', type)
          .setOnClick(this.onClickPen.bind(this))
          .build();
        btn.draw();
        return;
      }
      case 'circle': {
        const btn = new GrimpanMenuBtn.Builder(this, '원', type)
          .setOnClick(this.onClickCircle.bind(this))
          .build();
        btn.draw();
        return;
      }
      case 'rectangle': {
        const btn = new GrimpanMenuBtn.Builder(this, '사각형', type)
          .setOnClick(this.onClickRectangle.bind(this))
          .build();
        btn.draw();
        return;
      }
      case 'save': {
        const btn = new GrimpanMenuBtn.Builder(this, '저장', type)
          .setOnClick(this.onSave.bind(this))
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
  override setActiveBtn(type: GrimpanMode) {}
  override executeCommand(command: Command) {}
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
