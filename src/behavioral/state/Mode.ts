import { type Grimpan, type GrimpanMode } from '../../Grimpan.js';
import {
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
} from '../command/Command.js';

const convertToHex = (color: number) => {
  if (color < 0) {
    return 0;
  } else if (color > 255) {
    return 255;
  }
  const hex = color.toString(16);
  return `0${hex}`.slice(-2);
};
const rgb2hex = (r: number, g: number, b: number) => {
  return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
};

export abstract class Mode {
  constructor(protected grimpan: Grimpan) {}

  abstract mousedown(e: MouseEvent): void;
  abstract mousemove(e: MouseEvent): void;
  abstract mouseup(): void;
}

export class PenMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new PenSelectCommand(this.grimpan));
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = 'source-over';

    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    this.grimpan.setActive(true);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) return;
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(): void {
    this.grimpan.setActive(false);
  }
}
export class EraserMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new EraserSelectCommand(this.grimpan));
  }
  override mousedown(e: MouseEvent): void {
    this.grimpan.ctx.lineWidth = 10;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = '#000';
    this.grimpan.ctx.globalCompositeOperation = 'destination-out';

    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    this.grimpan.setActive(true);
  }

  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) return;
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }

  override mouseup(): void {
    this.grimpan.setActive(false);
  }
}
export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new PipetteSelectCommand(this.grimpan));
  }
  override mousedown(): void {}
  override mousemove(e: MouseEvent): void {
    const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    //data - ex [255, 255, 255, 1]
    if (data[3] === 0) {
      this.grimpan.changeColor('#ffffff');
    } else {
      this.grimpan.changeColor(rgb2hex(data[0]!, data[1]!, data[2]!));
    }
  }
  override mouseup(): void {
    this.grimpan.setMode('pen');
  }
}
export class RectangleMode extends Mode {
  override mousedown(): void {}
  override mousemove(): void {}
  override mouseup(): void {}
}
export class CircleMode extends Mode {
  override mousedown(): void {}
  override mousemove(): void {}
  override mouseup(): void {}
}
