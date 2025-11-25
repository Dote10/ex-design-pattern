/* class Grimpan {
  private static instance: Grimpan;
  private constructor(canvas:HTMLElement | null){
     if(!canvas || !(canvas instanceof HTMLElement)){
        throw new Error('canvas엘리먼트를 입력하세요.')
    }
  }

  initialize(){}
  initializeMenu(){}

  static getInstance(){
    if(! this.instance){
      this.instance = new Grimpan(document.querySelector('canvas'));
    }
    return this.instance;
  }
}

Grimpan.getInstance

export default Grimpan;
 */
