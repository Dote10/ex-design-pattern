import type { Burger } from './Burger.js'

export abstract class BurgerMain {
  abstract settingMainIngredient(burger: Burger): BurgerMain
}

export class CheseeBurgerMain {
  settingMainIngredient(burger: Burger): CheseeBurgerMain {
    burger.setStep('main Ingredient setting')
    return new CheseeBurgerMain()
  }
}
