import styles from './DetailsGroup.css'
import {
  adoptStyles,
  html,
  render,
} from '~/helper'


export class DetailsGroup extends HTMLElement {
  get multiple(): boolean {
    return this.hasAttribute('multiple')
  }

  set multiple(val: boolean) {
    val 
      ? this.setAttribute('multiple', '')
      : this.removeAttribute('multiple')
  }
  
  shadowRoot: ShadowRoot
  details: Array<HTMLDetailsElement> = []
  
  constructor() {
    super()
    this.shadowRoot = this.attachShadow({ mode: 'open' })
    render(
      html`
        <slot></slot>
      `,
      this.shadowRoot
    )
    adoptStyles(this.shadowRoot, styles)
  }

  connectedCallback() {
    this.details = Array.from(this.querySelectorAll('details-item, details'))
    this.addEventListener('click', (e) => this.handleDetailsChange(e))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleDetailsChange)
  }

  handleDetailsChange(e: Event) {
    if(this.multiple) return
    const target = e.target as HTMLElement
    const triggerDetail = target.tagName === 'DETAILS-ITEM' ? target : target.closest('details')
    this.details.forEach(detail => detail !== triggerDetail && detail.removeAttribute('open'))
  }
}

window.customElements.define('details-group', DetailsGroup)

declare global {
  interface HTMLElementTagNameMap {
    'details-group': DetailsGroup
  }
}