class Grimpan2 {
  private static instance: Grimpan2
  private id: string
  private constructor(canvas: HTMLElement | null, id: string) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('canvas엘리먼트를 입력하세요.')
    }
    this.id = id
  }

  initialize() {}
  initializeMenu() {}

  static getInstance(instanceId: string) {
    /* if(! this.instance){
      this.instance = new Grimpan(document.querySelector('canvas'),instanceId);
    }
    return this.instance; */

    if (this.instance && this.instance.id !== instanceId) {
      this.instance = new Grimpan2(document.querySelector('canvas'), instanceId)
    } else if (!this.instance) {
      this.instance = new Grimpan2(document.querySelector('canvas'), instanceId)
    }
    return this.instance
  }
}

Grimpan2.getInstance

export default Grimpan2
