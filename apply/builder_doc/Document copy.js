class Document {
    title;
    author;
    pageColor;
    addWatermark;
    constructor(title, author, pagecolor, addWatermark) {
        this.title = title;
        this.author = author;
        this.pageColor = pagecolor;
        if (addWatermark) {
            this.addWatermark = addWatermark;
        }
    }
}
class DocumentBuilder {
    document;
    constructor(title, author) {
        this.document = new Document(title, author);
    }
    setPageColor(pageColor) {
        this.document.pageColor = pageColor;
        return this;
    }
    setAddWatermark(addWatermark) {
        this.document.addWatermark = addWatermark;
        return this;
    }
    build() {
        return this.document;
    }
}
class DocumentDirect {
    static createBasicDocument(builder) {
        return builder.setPageColor('white').build();
    }
    static createWatermarkDocument(builder) {
        return builder.setPageColor('whtie').setAddWatermark(() => { });
    }
}
const basicDocument = DocumentDirect.createBasicDocument(new DocumentBuilder('메모1', 'seteeve'));
const watermarkDocument = DocumentDirect.createWatermarkDocument(new DocumentBuilder('저작권 문서', 'seteeve'));
export {};
//# sourceMappingURL=Document%20copy.js.map