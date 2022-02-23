import styles from './DetailsItem.css'
import {
  adoptStyles,
  html,
  render,
  waitForEvent,
  emit,
  stopAnimations,
  shimKeyframesHeightAuto,
  animateTo,
} from '../../helper'

const animations = {
  show: {
    keyframes: [
      { height: '0', opacity: '0' },
      { height: 'auto', opacity: '1' },
    ],
    options: { duration: 250, easing: 'linear' },
  },
  hide: {
    keyframes: [
      { height: 'auto', opacity: '1' },
      { height: '0', opacity: '0' },
    ],
    options: { duration: 250, easing: 'linear' },
  },
}

export class DetailsItem extends HTMLElement {
  shadowRoot: ShadowRoot
  base: HTMLElement
  header: HTMLElement
  body: HTMLElement
  content: HTMLElement

  static styles = styles

  get summary(): string {
    return (this.hasAttribute('summary') && this.getAttribute('summary')) || ''
  }

  set summary(val: string) {
    this.setAttribute('summary', '')
  }

  get open(): boolean {
    return this.hasAttribute('open')
  }

  set open(val: boolean) {
    val ? this.setAttribute('open', '') : this.removeAttribute('open')
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }

  set disabled(val: boolean) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')
  }

  constructor() {
    super()
    this.shadowRoot = this.attachShadow({ mode: 'open' })
    // this.render()
    render(
      html`
        <div part="base" ${this.open ? 'open' : ''}>
          <header
            aria-controls="content"
            aria-expanded=${this.open ? 'true' : 'false'}
            part="summary"
            tabindex="-1"
            role="button"
          >
            ${this.summary}
          </header>
          <div part="body">
            <div part="content">
              <slot></slot>
            </div>
          </div>
        </div>
      `,
      this.shadowRoot
    )

    adoptStyles(this.shadowRoot, styles)

    this.base = this.shadowRoot.querySelector('[part=base]')!
    this.header = this.shadowRoot.querySelector('[part=summary]')!
    this.body = this.shadowRoot.querySelector('[part=body]')!
    this.content = this.shadowRoot.querySelector('[part=content]')!

    this.header.addEventListener('click', (e) => this.handleClick(e))
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.header.removeEventListener('click', this.handleClick)
  }

  static get observedAttributes() {
    return ['open']
  }

  attributeChangedCallback(attrName: string) {
    if (attrName === 'open') {
      this.handleOpenChange()
    }
  }

  handleClick(e: MouseEvent) {
    if (this.disabled) return
    this.open ? this.hide() : this.show()
    this.header.focus()
  }

  async show() {
    if (this.open) return undefined
    this.open = true
    return waitForEvent(this, 'details-after-show')
  }

  async hide() {
    if (!this.open) return undefined
    this.open = false
    return waitForEvent(this, 'details-after-hide')
  }

  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'details-show')

      await stopAnimations(this.body)

      this.body.hidden = false
      this.base.setAttribute('open', '')
      this.header.setAttribute('aria-expanded', '')

      const { keyframes, options } = animations.show
      await animateTo(
        this.body,
        shimKeyframesHeightAuto(keyframes, this.body.scrollHeight),
        options
      )
      this.body.style.height = 'auto'

      emit(this, 'details-after-show')
    } else {
      // Hide
      emit(this, 'details-hide')

      await stopAnimations(this.body)

      this.base.removeAttribute('open')
      this.header.removeAttribute('aria-expanded')

      const { keyframes, options } = animations.hide
      await animateTo(
        this.body,
        shimKeyframesHeightAuto(keyframes, this.body.scrollHeight),
        options
      )
      this.body.hidden = true
      this.body.style.height = 'auto'

      emit(this, 'details-after-hide')
    }
  }

  render() {
    // this.shadowRoot.appendChild(Object.assign(document.createElement('style'), {
    //   textContent: DetailsItem.styles,
    // }))
    // this.base = Object.assign(document.createElement('div'), {
    //   part: 'base',
    // })
    // this.header = Object.assign(document.createElement('header'), {
    //   part: 'summary',
    //   textContent: this.summary
    // })
    // this.base.appendChild(this.header)
    // this.content = Object.assign(document.createElement('div'), {
    //   part: 'content',
    // })
    // this.base.appendChild(this.content)
    // this.content.appendChild(document.createElement('slot'))
    // this.shadowRoot.appendChild(this.base)
  }
}

window.customElements.define('details-item', DetailsItem)

declare global {
  interface HTMLElementTagNameMap {
    'details-item': DetailsItem
  }
}
