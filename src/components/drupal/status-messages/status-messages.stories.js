import { html } from 'lit'
import './status-messages.css'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Drupal/Status Messages',
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
  decorators: [(story) => html`<div data-drupal-messages="">${story()}</div>`],
}

export const Status = () => html`
  <div role="contentinfo" aria-label="Status message">
    <h2 class="visually-hidden">Status message</h2>
    Article
    <em class="placeholder"><a href="/node/3" hreflang="en">Article 3</a></em>
    has been updated.
  </div>
`

export const Warning = () => html`
  <div role="contentinfo" aria-label="Warning message">
    <h2 class="visually-hidden">Status message</h2>
    Article
    <em class="placeholder"><a href="/node/3" hreflang="en">Article 3</a></em>
    has been updated.
  </div>
`

export const Error = () => html`
  <div role="contentinfo" aria-label="Error message">
    <h2 class="visually-hidden">Status message</h2>
    Article
    <em class="placeholder"><a href="/node/3" hreflang="en">Article 3</a></em>
    has been updated.
  </div>
`

export const All = () => html`
  <div role="contentinfo" aria-label="Status message">
    <h2 class="visually-hidden">Status message</h2>
    Article
    <em class="placeholder"><a href="/node/3" hreflang="en">Article 3</a></em>
    has been updated.
  </div>
  <div role="contentinfo" aria-label="Warning message">
    <h2 class="visually-hidden">Status message</h2>
    Article
    <em class="placeholder"><a href="/node/3" hreflang="en">Article 3</a></em>
    has been updated.
  </div>
  <div role="contentinfo" aria-label="Error message">
    <h2 class="visually-hidden">Status message</h2>
    Article
    <em class="placeholder"><a href="/node/3" hreflang="en">Article 3</a></em>
    has been updated.
  </div>
`
