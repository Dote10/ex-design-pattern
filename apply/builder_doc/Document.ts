class Document {
  private title: string | undefined
  private author: string | undefined
  private pageColor?: string | undefined
  private addWatermark?: () => void | undefined

  private constructor(
    title: string,
    author: string,
    pagecolor?: string,
    addWatermark?: () => void,
  ) {
    this.title = title
    this.author = author
    this.pageColor = pagecolor
    if (addWatermark) {
      this.addWatermark = addWatermark
    }
  }

  static Builder = class DocumentBuilder {
    document: Document

    constructor(title: string, author: string) {
      this.document = new Document(title, author)
    }

    setPageColor(pageColor: string) {
      this.document.pageColor = pageColor
      return this
    }

    setAddWatermark(addWatermark: () => void) {
      this.document.addWatermark = addWatermark
      return this
    }

    build() {
      return this.document
    }
  }
}

const basicDocument = new Document.Builder('문서1', 'steeve').build()
