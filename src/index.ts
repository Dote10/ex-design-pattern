import {
  AbstractGrimpanFactory,
  ChromeGrimpanFactory,
} from './abstract_factory/GrimpanFactory.js';
import SafariGrimpan from './SafariGrimpan.js';

function grimpanFactory(type: string) {
  if (type === 'ie') {
    return; //IEGrimpan.getInstance();
  } else if (type === 'chrome') {
    return; //ChromeGrimpan.getInstance();
  } else if (type === 'safari') {
    return SafariGrimpan.getInstance();
  } else {
    throw new Error('일치하는 type이 없습니다.');
  }
}

function main(factory: typeof AbstractGrimpanFactory) {
  const grimpan = factory.createGrimpan();

  grimpan.initialize({
    menu: [
      'back',
      'forward',
      'color',
      'pipette',
      'pen',
      'circle',
      'rectangle',
      'eraser',
      'save',
    ],
  });
}

main(ChromeGrimpanFactory);
