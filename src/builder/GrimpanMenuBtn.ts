import type { GrimpanMenu } from '../abstract_factory/GrimpanMenu_abs_factory';

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

export class GrimpanMenuBtn2 {
  private menu: GrimpanMenu;
  private name: string;
  private type: string;
  private onClick?: () => void;
  private onChange?: () => void;
  private active?: boolean;
  private value?: string | number;

  private constructor(
    menu: GrimpanMenu,
    name: string,
    type: string,
    onClick?: () => void,
    onChange?: () => void,
    active?: boolean,
    value?: string | number,
  ) {
    this.menu = menu;
    this.name = name;
    this.type = type;
    if (onClick) {
      // onClick이 undefined가 아닐 때만 할당
      this.onClick = onClick;
    }
    if (onChange) {
      this.onChange = onChange;
    }
    this.active = active;
    this.value = value;
  }

  //현재 draw는 단일 책임 원칙 위반이기 때문에
  //추후의 리팩토링을 한다.
  draw() {
    if (this.type === 'button') {
      const btn = document.createElement('button');
      btn.textContent = this.name;
      if (this.onClick) {
        btn.addEventListener('click', this.onClick.bind(this));
      }
      this.menu.dom.append(btn);
    } else if (this.type === 'input') {
      const btn = document.createElement('input');
      btn.title = this.name;
      if (this.onChange) {
        btn.addEventListener('change', this.onChange.bind(this));
      }
      this.menu.dom.append(btn);
    }
  }

  static Builder = class GrimpanMenuBntBuilder {
    btn: GrimpanMenuBtn2;
    constructor(menu: GrimpanMenu, name: string, type: string) {
      this.btn = new GrimpanMenuBtn2(menu, name, type);
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setOnChange(onChange: () => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }

    build() {
      return this.btn;
    }
  };
}

//const backBtn = new ChromeGrimpanMenuBtnBuilder('뒤로', 'back')

//backBtn.name = 'Back'
//backBtn.setName('Back')

/* const longValue = '' //오래 걸리는 작업
backBtn.setValue(longValue) */

//생성과 동시에 완성

//const backBtn = new GrimpanMenuBtn.Builder('뒤로', 'back');

//.setOnClick(() => {})
//.setActive(false)
//.build()

//추후 값 세팅후 완성
/* const backBtnBuilder = new GrimpanMenuBtn.Builder('뒤로', 'back')
  .setOnClick(() => {})
  .setActive(false); */

const value = ''; //오래 걸리는 작업

//const backBtnLong = backBtnBuilder.setValue(value).build();
