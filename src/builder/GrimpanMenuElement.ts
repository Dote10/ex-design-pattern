import type { BtnType, GrimpanMenu } from '../behavioral/command/GrimpanMenu';

interface Btn {
  name: string;
  type: string;
  onClick: () => void;
  active: boolean;
}

interface Input {
  name: string;
  type: string;
  onchange: () => void;
  value: string | number;
}

abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;
  protected type: BtnType;

  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    this.menu = menu;
    this.name = name;
    this.type = type;
  }

  abstract draw(): void;
}

abstract class GrimpanMenuElementBuilder {
  element!: GrimpanMenuElement;
  constructor() {}

  build() {
    return this.element;
  }
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: (e: Event) => void;
  private value?: string | number;

  constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onChange?: (e: Event) => void,
    value?: string | number,
  ) {
    super(menu, name, type);
    this.onChange = onChange;
    this.value = value;
  }

  override draw(): void {
    const input = document.createElement('input');
    input.textContent = this.name;
    input.id = 'color-input';
    input.type = this.type;
    if (this.onChange) input.addEventListener('change', this.onChange);
    this.menu.colorInput = input;
    this.menu.dom.append(input);
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override element: GrimpanMenuInput;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.element = new GrimpanMenuInput(menu, name, type);
    }

    setOnChange(onChange: (e: Event) => void) {
      this.element.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.element.value = value;
      return this;
    }
  };
}

export class GrimpanMenuBtn extends GrimpanMenuElement {
  private onClick?: () => void;
  private active?: boolean;

  constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onClick?: () => void,
    active?: boolean,
  ) {
    super(menu, name, type);
    this.onClick = onClick;
    this.active = active;
  }

  override draw(): void {
    const btn = document.createElement('button');
    btn.textContent = this.name;
    btn.id = `${this.type}-btn`;
    if (this.onClick) btn.addEventListener('click', this.onClick);
    this.menu.dom.append(btn);
  }

  static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
    override element: GrimpanMenuBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.element = new GrimpanMenuBtn(menu, name, type);
    }

    setActive(active: boolean) {
      this.element.active = active;
      return this;
    }
    setOnClick(onClick: () => void) {
      this.element.onClick = onClick;
      return this;
    }
  };
}
