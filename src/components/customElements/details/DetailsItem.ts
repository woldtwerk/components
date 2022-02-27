import styles from './DetailsItem.css'
import {
  adoptStyles,
  animations,
  html,
  render,
  waitForEvent,
  emit,
  stopAnimations,
  shimKeyframesHeightAuto,
  animateTo,
  reflectProp,
  setBooleanAttr
} from '~/helper'

export class DetailsItem extends HTMLElement {
  summary: string = ''
  open: boolean = false
  disabled: boolean = false

  shadowRoot: ShadowRoot
  base: HTMLElement
  header: HTMLElement
  body: HTMLElement
  content: HTMLElement

  static styles = styles

  constructor() {
    super()
    this.shadowRoot = this.attachShadow({ mode: 'open' })
    adoptStyles(this.shadowRoot, styles)

    reflectProp(this, 'summary')
    reflectProp(this, 'open')
    reflectProp(this, 'disabled')
    
    this.render()
    this.base = this.shadowRoot.querySelector('[part=base]')!
    this.header = this.shadowRoot.querySelector('[part=summary]')!
    this.body = this.shadowRoot.querySelector('[part=body]')!
    this.content = this.shadowRoot.querySelector('[part=content]')!

    this.header.addEventListener('click', (e) => this.handleClick(e))
    this.header.addEventListener('keyup', (e) => this.handleKeyDown(e))
  }

  disconnectedCallback() {
    this.header.removeEventListener('click', this.handleClick)
    this.header.removeEventListener('keydown', this.handleKeyDown)
  }

  static get observedAttributes() {
    return ['open']
  }

  attributeChangedCallback(attrName: string) {
    if (attrName === 'open') {
      this.handleOpenChange()
    }
  }

  render() {
    const template = html`
      <div part="base" ${this.open ? 'open' : ''}>
        <header
          aria-controls="content"
          aria-expanded=${this.open ? 'true' : 'false'}
          part="summary"
          tabindex="0"
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
    `
    render(template, this.shadowRoot)
  }

  update() {
    setBooleanAttr(this.base, 'open', this.open)
    setBooleanAttr(this.header, 'aria-expanded', this.open)
  }

  handleClick(e: MouseEvent) {
    if (this.disabled) return
    this.open ? this.hide() : this.show()
    this.header.focus()
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.hide();
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      this.show();
    }
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
      this.update()

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

      this.update()

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
}

window.customElements.define('details-item', DetailsItem)

declare global {
  interface HTMLElementTagNameMap {
    'details-item': DetailsItem
  }
}
