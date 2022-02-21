import { html } from 'lit'
import './local-tasks.css'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Drupal/Local Tasks',
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
}

export const LocalTasks = () => html`
  <div id="block-stark-local-tasks">
    <h2 class="visually-hidden">Primary tabs</h2>
    <ul>
      <li>
        <a
          href="/node/3"
          data-drupal-link-system-path="node/3"
          class="is-active"
          >View<span class="visually-hidden">(active tab)</span></a
        >
      </li>
      <li>
        <a href="/node/3/edit" data-drupal-link-system-path="node/3/edit"
          >Edit</a
        >
      </li>
      <li>
        <a href="/node/3/delete" data-drupal-link-system-path="node/3/delete"
          >Delete</a
        >
      </li>
      <li>
        <a
          href="/node/3/revisions"
          data-drupal-link-system-path="node/3/revisions"
          >Revisions</a
        >
      </li>
    </ul>
  </div>
`
