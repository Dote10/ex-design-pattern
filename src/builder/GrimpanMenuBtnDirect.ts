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

class GrimpanMenuBtn {
  name?: string | undefined;
  type?: string | undefined;
  onClick?: () => void | undefined;
  onChange?: () => void | undefined;
  active?: boolean | undefined;
  value?: string | number | undefined;

  constructor(
    name?: string,
    type?: string,
    onClick?: () => void,
    onChange?: () => void,
    active?: boolean,
    value?: string | number,
  ) {
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
}

interface GrimpanMenuBtnBuilder {
  setName(name: string): this;
  setType(type: string): this;
  setOnClick(onClick: () => void): this;
  setOnChange(onChange: () => void): this;
  setActive(active: boolean): this;
  setValue(value: string | number): this;
  build(): GrimpanMenuBtn;
}

class ChromeGrimpanMenuBtnBuilder implements GrimpanMenuBtnBuilder {
  btn: GrimpanMenuBtn;
  constructor() {
    this.btn = new GrimpanMenuBtn();
  }

  setName(name: string) {
    this.btn.name = name;
    return this;
  }

  setType(type: string) {
    this.btn.type = type;
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

  setActive(active: boolean) {
    this.btn.active = active;
    return this;
  }

  setValue(value: string | number) {
    this.btn.value = value;
    return this;
  }

  build() {
    return this.btn;
  }
}

class IEGrimpanMenuBtnBuilder implements GrimpanMenuBtnBuilder {
  btn: GrimpanMenuBtn;
  constructor() {
    this.btn = new GrimpanMenuBtn();
  }

  setName(name: string) {
    this.btn.name = name;
    return this;
  }

  setType(type: string) {
    this.btn.type = type;
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

  setActive(active: boolean) {
    this.btn.active = active;
    return this;
  }

  setValue(value: string | number) {
    this.btn.value = value;
    return this;
  }

  build() {
    return this.btn;
  }
}

//const backBtn = new ChromeGrimpanMenuBtnBuilder('뒤로', 'back')

//backBtn.name = 'Back'
//backBtn.setName('Back')

/* const longValue = '' //오래 걸리는 작업
backBtn.setValue(longValue) */

/* const backBtnBuilder = new GrimpanMenuBtn.Builder('뒤로','back')
.setOnClick(()=>{})
.setActive(false)
.build(); */

export class GrimpanMenuBtnDirector {
  static createBackBtn(builder: GrimpanMenuBtnBuilder) {
    const backBtnBuilder = builder
      .setName('뒤로')
      .setType('back')
      .setOnClick(() => {})
      .setActive(false);
    return backBtnBuilder;
  }
  static createForwardBtn(builder: GrimpanMenuBtnBuilder) {
    const forwardBtnBuilder = builder
      .setName('앞으로')
      .setType('forward')
      .setOnClick(() => {})
      .setActive(false);
    return forwardBtnBuilder;
  }
}

//디렉터가 있을 때 : 단순화된 코드 호출
GrimpanMenuBtnDirector.createBackBtn(new ChromeGrimpanMenuBtnBuilder());
GrimpanMenuBtnDirector.createForwardBtn(new IEGrimpanMenuBtnBuilder());
