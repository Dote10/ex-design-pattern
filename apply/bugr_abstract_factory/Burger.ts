export abstract class Burger {
  constructor(private cookedStep?: string) {}
  setStep(step: string) {
    this.cookedStep = step
  }
}

export class CheeseBurger extends Burger {}

export class HamBurger extends Burger {}
