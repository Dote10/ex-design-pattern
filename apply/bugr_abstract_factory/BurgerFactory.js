import { Burger, CheeseBurger, HamBurger } from './Burger.js';
export class BurgerFactory {
}
export class CheeseBurgerFactory {
    createBuger() {
        return new CheeseBurger('start');
    }
}
export class HamBurgerFactory {
    createBuger() {
        return new HamBurger('start');
    }
}
//# sourceMappingURL=BurgerFactory.js.map