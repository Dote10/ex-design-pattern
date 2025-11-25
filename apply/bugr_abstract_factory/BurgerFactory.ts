import { Burger, CheeseBurger, HamBurger } from './Burger.js'

export abstract class BurgerFactory {
  abstract createBurger(): Burger
}

export class CheeseBurgerFactory {
  createBuger(): CheeseBurger {
    return new CheeseBurger('start')
  }
}

export class HamBurgerFactory {
  createBuger(): CheeseBurger {
    return new HamBurger('start')
  }
}
