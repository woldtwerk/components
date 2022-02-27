
declare global {
  interface CSSStyleSheet {
    replaceSync: Function
    __hmrId: string
  }

  interface Array<T> {
    at(index: number): any
  }
  
  interface ShadowRoot {
    adoptedStyleSheets: Array<CSSStyleSheet>
  }
  interface Window {
    tw: {
      styles: string
      sheet: CSSStyleSheet
    }
    swup: any
  }

}

export {}