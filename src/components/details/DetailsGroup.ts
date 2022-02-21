import './styles.css'

export class DetailsGroup extends HTMLElement {
  get multiple(): boolean {
    return this.hasAttribute('multiple')
  }

  set multiple(val: boolean) {
    val 
      ? this.setAttribute('multiple', '')
      : this.removeAttribute('multiple')
  }

  static get observedAttributes() {
    return ['multiple'];
  }
  
  details: Array<HTMLDetailsElement> = []
  
  constructor() {
    super()
  }

  connectedCallback() {
   this.details = Array.from(this.querySelectorAll('details'))
   this.addEventListener('click', (e) => this.handleDetailsChange(e))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleDetailsChange)
  }

  handleDetailsChange(e: Event) {
    if(this.multiple) return
    const target = e.target as HTMLElement
    const triggerDetail = target.tagName === 'DETAILS' ? target : target.closest('details')
    this.details.forEach(detail => detail !== triggerDetail && detail.removeAttribute('open'))
  }
}

window.customElements.define('details-group', DetailsGroup)

declare global {
  interface HTMLElementTagNameMap {
    'details-group': DetailsGroup
  }
}