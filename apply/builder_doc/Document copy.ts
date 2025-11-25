class Document {
  private title: string | undefined;
  private author: string | undefined;
  pageColor?: string | undefined;
  addWatermark?: () => void | undefined;

  constructor(
    title: string,
    author: string,
    pagecolor?: string,
    addWatermark?: () => void,
  ) {
    this.title = title;
    this.author = author;
    this.pageColor = pagecolor;
    if (addWatermark) {
      this.addWatermark = addWatermark;
    }
  }
}

interface IDocumentBuilder {
  document: Document;
  setPageColor(pageColor: string): this;
  setAddWatermark(addWatermark: () => void): this;
  build(): Document;
}

class DocumentBuilder implements IDocumentBuilder {
  document: Document;
  constructor(title: string, author: string) {
    this.document = new Document(title, author);
  }

  setPageColor(pageColor: string): this {
    this.document.pageColor = pageColor;
    return this;
  }

  setAddWatermark(addWatermark: () => void): this {
    this.document.addWatermark = addWatermark;
    return this;
  }

  build() {
    return this.document;
  }
}

class DocumentDirect {
  static createBasicDocument(builder: IDocumentBuilder) {
    return builder.setPageColor('white').build();
  }

  static createWatermarkDocument(builder: IDocumentBuilder) {
    return builder.setPageColor('whtie').setAddWatermark(() => {});
  }
}

const basicDocument = DocumentDirect.createBasicDocument(
  new DocumentBuilder('메모1', 'seteeve'),
);

const watermarkDocument = DocumentDirect.createWatermarkDocument(
  new DocumentBuilder('저작권 문서', 'seteeve'),
);
