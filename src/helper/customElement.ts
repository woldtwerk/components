export const html = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return values.reduce(
    (a: string, v: unknown, i: number) => a + v + strings[i + 1],
    strings[0]
  )
}

export const render = (
  markup: string,
  target: ShadowRoot | Element | DocumentFragment
) => {
  const template = document.createElement('template')
  template.innerHTML = markup
  target.appendChild(template.content)
}

//
// Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements.
//
export function waitForEvent(el: HTMLElement, eventName: string) {
  return new Promise<void>((resolve) => {
    function done(event: Event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done)
        resolve()
      }
    }

    el.addEventListener(eventName, done)
  })
}

//
// Emits a custom event with more convenient defaults.
//
export function emit(el: HTMLElement, name: string, options?: CustomEventInit) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {},
    ...options,
  })
  el.dispatchEvent(event)
  return event
}

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
export const supportsAdoptingStyleSheets =
  window.ShadowRoot &&
  'adoptedStyleSheets' in Document.prototype &&
  'replaceSync' in CSSStyleSheet.prototype

/**
 * Add constructed Stylesheet or style tag to Shadowroot of VueCE.
 * @param renderRoot The shadowroot of the vueCE..
 * @param styles The styles of the Element.
 * @param __hmrId hmr id of vite used as an UUID.
 */
export const adoptStyles = (renderRoot: ShadowRoot, styles: string) => {
  if (supportsAdoptingStyleSheets) {
    const styleSheet: CSSStyleSheet = new CSSStyleSheet()
    styleSheet.replaceSync(baseStyles + styles)
    renderRoot.adoptedStyleSheets = [styleSheet]
  } else {
    const style = document.createElement('style')
    style.textContent = styles + baseStyles
    renderRoot.appendChild(style)
  }
}

export const baseStyles = `
   :host {
     box-sizing: border-box;
     display: block;
   }
   :host *,
   :host *::before,
   :host *::after {
     box-sizing: inherit;
   }
   [hidden] {
     display: none !important;
   }
 `

/**
 * 
 * @param target 
 * @param propKey 
 */
export const reflectProp = (target: HTMLElement | any, propKey: PropertyKey) => {
  // Boolean.
  if(typeof target[propKey] === 'boolean') {
    Object.defineProperty(target, propKey, {
      get() {
        return target.hasAttribute(propKey)
      },
      set(v) {
        v ? target.setAttribute(propKey, '') : target.removeAttribute(propKey)
      }
    })
  }

  // String.
  if(typeof target[propKey] === 'string') {
    Object.defineProperty(target, propKey, {
      get() {
        return target.getAttribute(propKey) || undefined
      },
      set(v) {
        target.setAttribute(propKey, v)
      }
    })
  }

  // Number.
  if(typeof target[propKey] === 'number') {
    Object.defineProperty(target, propKey, {
      get() {
        return +target.getAttribute(propKey) || undefined
      },
      set(v) {
        target.setAttribute(propKey, v)
      }
    })
  }
}

export const setBooleanAttr = (el: HTMLElement, key: string, val: boolean) => {
  val
    ? el.setAttribute(key, '')
    : el.removeAttribute(key)
}