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
    static Builder = class DocumentBuilder {
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
    };
}
const basicDocument = new Document.Builder('문서1', 'steeve').build();
export {};
//# sourceMappingURL=Document.js.map