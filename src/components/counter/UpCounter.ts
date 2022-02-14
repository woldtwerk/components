import './styles.css'

export class UpCounter extends HTMLElement {
  get value(): string {
    return this.getAttribute('value') || ''
  }

  set value(val: string) {
    this.setAttribute('value', val)
  }

  get durattion(): number {
    return this.hasAttribute('duration') && +(this.getAttribute('duration') || 0) || 0
  }

  set duration(val: string | number) {
    this.setAttribute('duration', `${val}`)
  }
  
  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'open'})
    const start = +new Number(0).toFixed(this.getDecimals(this.value))
    this.animateValue(shadowRoot, start, 10.2, 3000);
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  easeOutQuad(t: number) {
    return t * (2 - t )
  }

  animateValue(el: Element | ShadowRoot, start: number, end: number, duration: number) {
    let startTimestamp: number = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = this.easeOutQuad(Math.min((timestamp - startTimestamp) / duration, 1))
      // const progress = this.easeOutQuad((timestamp - startTimestamp) / duration)
      el.innerHTML = (progress * (end - start) + start).toFixed(2).toLocaleString()
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  /**
   * Get decimal precision of number.
   * @param val 
   * @returns 
   */
  getDecimals(val: string) {
    return val.split('.').length === 2
      // @ts-expect-error
      ? val.split('.').at(-1).length
      : 0
  }

  // getLocal() {
  //   return navigator.languages ? navigator.languages[0] : 'en'
  // }
}

window.customElements.define('up-counter', UpCounter)

declare global {
  interface HTMLElementTagNameMap {
    'up-counter': UpCounter
  }
}