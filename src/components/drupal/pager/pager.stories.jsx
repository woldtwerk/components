import { html } from 'lit'
import './pager.css'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Drupal/Pager',
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
}

export const Full = () => html`
  <nav
    class="pager"
    role="navigation"
    aria-labelledby="pagination-heading--imyt5PDV4nE"
  >
    <h4 id="pagination-heading--imyt5PDV4nE" class="visually-hidden">
      Pagination
    </h4>
    <ul class="pager__items js-pager__items">
      <li class="pager__item pager__item--first">
        <a title="Go to first page">
          <span class="visually-hidden">First page</span>
          <span aria-hidden="true">« First</span>
        </a>
      </li>
      <li class="pager__item pager__item--previous">
        <a title="Go to previous page" rel="prev">
          <span class="visually-hidden">Previous page</span>
          <span aria-hidden="true">‹ Previous</span>
        </a>
      </li>
      <li class="pager__item">
        <a title="Go to page 1">
          <span class="visually-hidden"> Page </span>1</a
        >
      </li>
      <li class="pager__item is-active">
        <a title="Current page">
          <span class="visually-hidden"> Current page </span>2</a
        >
      </li>
      <li class="pager__item">
        <a title="Go to page 3">
          <span class="visually-hidden"> Page </span>3</a
        >
      </li>
      <li class="pager__item pager__item--next">
        <a title="Go to next page" rel="next">
          <span class="visually-hidden">Next page</span>
          <span aria-hidden="true">Next ›</span>
        </a>
      </li>
      <li class="pager__item pager__item--last">
        <a title="Go to last page">
          <span class="visually-hidden">Last page</span>
          <span aria-hidden="true">Last »</span>
        </a>
      </li>
    </ul>
  </nav>
`

export const Mini = () => html`
 <nav role="navigation" aria-labelledby="pagination-heading--AftWP6psQok">
    <h4 id="pagination-heading--AftWP6psQok" class="visually-hidden">Pagination</h4>
    <ul class="js-pager__items">
      <li>
        <a title="Go to previous page" rel="prev">
          <span class="visually-hidden">Previous page</span>
          <span aria-hidden="true">‹ Previous</span>
        </a>
      </li>
      <li>
        Page 2 </li>
      <li>
        <a title="Go to next page" rel="next">
          <span class="visually-hidden">Next page</span>
          <span aria-hidden="true">Next ›</span>
        </a>
      </li>
    </ul>
  </nav>
`
