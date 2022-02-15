export class UpCounter extends HTMLElement {
  start: number
  decimals: number
  shadowRoot: ShadowRoot;
  slots: NodeListOf<HTMLElement>
  io: IntersectionObserver | null
  content: HTMLElement
  width: number = 0

  /**
   * Value to count to.
   */
  get value(): number {
    return Number(this.getAttribute('value'))
  }

  /**
   * Animation duration.
   */
  get duration(): number {
    return this.hasAttribute('duration') && Number(this.getAttribute('duration')) || 3000
  }

  /**
   * Start counting when element is visible instead of immediately.
   */
  get intersect(): boolean {
    return this.hasAttribute('intersect')
  }

  /**
   * Delay counting animations start.
   */
  get delay(): number {
    return this.hasAttribute('delay') && Number(this.getAttribute('delay')) || 0 
  }
  
  constructor() {
    super()
    this.slots = this.querySelectorAll<HTMLElement>('[slot]')
    this.shadowRoot = this.attachShadow({mode: 'open'})
    this.start = +new Number(0).toFixed(this.getDecimals(this.value))
    this.decimals = this.getDecimals(this.value)
    this.io = null
    this.intersect && this.createIo()
    this.render()
    this.content = this.shadowRoot.querySelector('[part="content"]')!
  }

  connectedCallback() {
    // Set minWidth to content to prevent prefix/suffix jumping around.
    this.content.style.minWidth = `${this.content.clientWidth}px`
    // Set content to starting value.
    this.content.textContent = `${this.start}`
    !this.intersect && this.startCounting()
  }

  disconnectedCallback() {
    this.io && this.io.disconnect()
  }

  /**
   * Create Intersection observer.
   */
  createIo() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.startCounting()
          this.io && this.io.disconnect()
        }
      })
    }, {
      threshold: 0,
      root: null,
      rootMargin: '-100px 0px 0px 0px'
    })
    this.io.observe(this)
  }

  /**
   * Start Animation.
   */
  public startCounting() {
    this.classList.add('counting')
    window.setTimeout(() => this.animateValue(this.content, this.start, this.value, this.duration), this.delay)
  }

  /**
   * Ease animation at end.
   * @param t 
   * @returns 
   */
  easeOutQuad(t: number) {
    return t * (2 - t )
  }

  /**
   * Animates the counter.
   * @param el Element container
   * @param start starting number
   * @param end end number
   * @param duration animation duration
   */
  animateValue(el: Element | ShadowRoot, start: number, end: number, duration: number) {
    let startTimestamp: number = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = this.easeOutQuad(Math.min((timestamp - startTimestamp) / duration, 1))
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
    this.shadowRoot.appendChild(Object.assign(document.createElement('style'), {
      textContent: `
        :host {
          display: inline-block;
        }

        [part="wrapper"] {
          display: inline-flex;
          gap: 0.5ch;
        }

        [part="content"] {
          display: inline-block;
          text-align: ${Array.from(this.slots).find(slot => slot.slot === 'suffix') ? 'right' : 'left'};
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
      part: 'content',
      textContent: this.value.toLocaleString(undefined, {
        minimumFractionDigits: this.decimals,
        maximumFractionDigits: this.decimals
      }).replace(/\d/g, '0')
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
