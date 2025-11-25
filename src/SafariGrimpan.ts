class SafariGrimpan {
  private static instance: SafariGrimpan;
  private constructor(canvas:HTMLElement | null){
     if(!canvas || !(canvas instanceof HTMLElement)){
        throw new Error('canvas엘리먼트를 입력하세요.')
    }
  }

  initialize(){}
  initializeMenu(){}

  static getInstance(){
    if(! this.instance){
      this.instance = new SafariGrimpan(document.querySelector('canvas'));
    }
    return this.instance;
  }
}

SafariGrimpan.getInstance

export default SafariGrimpan;
