import './styles.css'

export class UpCounter extends HTMLElement {
  start: number
  decimals: number
  shadowRoot: ShadowRoot;

  get value(): number {
    return Number(this.getAttribute('value'))
  }

  set value(val: number) {
    this.setAttribute('value', `${val}`)
  }

  get duration(): number {
    return this.hasAttribute('duration') && +(this.getAttribute('duration') || 0) || 0
  }

  set duration(val: string | number) {
    this.setAttribute('duration', `${val}`)
  }
  
  constructor() {
    super()
    this.shadowRoot = this.attachShadow({mode: 'open'})
    this.start = +new Number(0).toFixed(this.getDecimals(this.value))
    this.decimals = this.getDecimals(this.value)
    this.render()
  }

  connectedCallback() {
    this.animateValue(this.shadowRoot.querySelector('[part="content"]')!, this.start, this.value, 3000);
  }

  disconnectedCallback() {

  }

  /**
   * Ease animation at end.
   * @param t 
   * @returns 
   */
  easeOutQuad(t: number) {
    return t * (2 - t )
  }

  animateValue(el: Element | ShadowRoot, start: number, end: number, duration: number) {
    let startTimestamp: number = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = this.easeOutQuad(Math.min((timestamp - startTimestamp) / duration, 1))
      // const progress = this.easeOutQuad((timestamp - startTimestamp) / duration)
      el.innerHTML = (progress * (end - start) + start).toLocaleString(undefined, {
        minimumFractionDigits: this.decimals,
        maximumFractionDigits: this.decimals
      })
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
  getDecimals(val: number) {
    return `${val}`.split('.').length === 2
      // @ts-expect-error
      ? `${val}`.split('.').at(-1).length
      : 0
  }

  render() {
    const val = this.value.toLocaleString()
    const length = val.length - (val.match(/,|\./g)!.length / 2)

    this.shadowRoot.appendChild(Object.assign(document.createElement('style'), {
      textContent: `
        [part="wrapper"] {
          display: inline-flex;
          gap: 0.5ch;
        }

        [part="content"] {
          display: inline-block;
          min-width: ${length}ch;
          text-align: right;
        }
      `
    }))

    const wrapper = Object.assign(document.createElement('div'), {
      part: 'wrapper'
    })

    wrapper.appendChild(Object.assign(document.createElement('slot'), {
      name: 'prefix'
    }))

    wrapper.appendChild(Object.assign(document.createElement('div'), {
      part: 'content'
    }))

    wrapper.appendChild(Object.assign(document.createElement('slot'), {
      name: 'suffix'
    }))

    this.shadowRoot.appendChild(wrapper)
  }
}

window.customElements.define('up-counter', UpCounter)

declare global {
  interface HTMLElementTagNameMap {
    'up-counter': UpCounter
  }
}
