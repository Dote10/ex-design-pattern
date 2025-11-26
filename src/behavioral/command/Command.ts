import type { Grimpan } from '../../Grimpan.js';
import type { GrimpanHistory } from '../../prototype/GrimpanHistory.js';
import {
  CircleMode,
  EraserMode,
  PenMode,
  PipetteMode,
  RectangleMode,
} from '../state/Mode.js';

export interface Command {
  execute(): void;
}

export class BackCommand implements Command {
  name = 'back';
  constructor(public history: GrimpanHistory) {}

  execute(): void {
    //receiver에게 로직 전송
    this.history.undo();
  }
}

export class ForwardCommand implements Command {
  name = 'forward';
  constructor(public history: GrimpanHistory) {}

  execute(): void {
    //receiver에게 로직 전송
    this.history.redo();
  }
}

// select 구현
export class PenSelectCommand implements Command {
  name = 'penSelect';
  constructor(private grimpan: Grimpan) {}
  execute(): void {
    //펜 구현
    this.grimpan.menu.setActiveBtn('pen');
  }
}

export class EraserSelectCommand implements Command {
  name = 'eraserSelect';
  constructor(private grimpan: Grimpan) {}
  execute(): void {
    this.grimpan.menu.setActiveBtn('eraser');
  }
}

export class CircleSelectCommand implements Command {
  name = 'circleSelect';
  constructor(private grimpan: Grimpan) {}
  execute(): void {
    this.grimpan.menu.setActiveBtn('circle');
  }
}

export class RectangleSelectCommand implements Command {
  name = 'rectangleSelect';
  constructor(private grimpan: Grimpan) {}
  execute(): void {
    this.grimpan.menu.setActiveBtn('rectangle');
  }
}

export class PipetteSelectCommand implements Command {
  name = 'pipetteSelect';
  constructor(private grimpan: Grimpan) {}
  execute(): void {
    this.grimpan.menu.setActiveBtn('pipette');
  }
}

export class SaveCommnad implements Command {
  name = 'save';
  constructor(private grimpan: Grimpan) {}

  execute(): void {
    this.grimpan.saveStrategy();
  }
}
