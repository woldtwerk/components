export const html = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return values.reduce(
    (a: string, v: unknown, i: number) => a + v + strings[i + 1],
    strings[0]
  );
}

export const render = (markup: string, target: ShadowRoot | Element | DocumentFragment) => {
  const template = document.createElement('template')
  template.innerHTML = markup
  target.appendChild(template.content)
}

//
// Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements.
//
export function waitForEvent(el: HTMLElement, eventName: string) {
  return new Promise<void>(resolve => {
    function done(event: Event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }

    el.addEventListener(eventName, done);
  });
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
    ...options
  });
  el.dispatchEvent(event);
  return event;
}

//
// Animates an element using keyframes. Returns a promise that resolves after the animation completes or gets canceled.
//
export function animateTo(el: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions) {
  return new Promise(resolve => {
    if (options?.duration === Infinity) {
      throw new Error('Promise-based animations must be finite.');
    }

    const animation = el.animate(keyframes, {
      ...options,
      duration: prefersReducedMotion() ? 0 : options!.duration
    });

    animation.addEventListener('cancel', resolve, { once: true });
    animation.addEventListener('finish', resolve, { once: true });
  });
}

//
// Tells if the user has enabled the "reduced motion" setting in their browser or OS.
//
export function prefersReducedMotion() {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  return query.matches;
}

//
// Stops all active animations on the target element. Returns a promise that resolves after all animations are canceled.
//
export function stopAnimations(el: HTMLElement) {
  return Promise.all(
    el.getAnimations().map(animation => {
      return new Promise(resolve => {
        const handleAnimationEvent = requestAnimationFrame(resolve);

        animation.addEventListener('cancel', () => handleAnimationEvent, { once: true });
        animation.addEventListener('finish', () => handleAnimationEvent, { once: true });
        animation.cancel();
      });
    })
  );
}

// We can't animate `height: auto`, but we can calculate the height and shim keyframes by replacing it with the
// element's scrollHeight before the animation.
export function shimKeyframesHeightAuto(keyframes: Keyframe[], calculatedHeight: number) {
  return keyframes.map(keyframe => ({
    ...keyframe,
    height: keyframe.height === 'auto' ? `${calculatedHeight}px` : keyframe.height
  }));
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
export const adoptStyles = (
  renderRoot: ShadowRoot,
  styles: string
 ) => {

  if(supportsAdoptingStyleSheets) {
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