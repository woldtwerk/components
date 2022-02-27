import { html } from 'lit'
import './DetailsGroup.ts'
import './DetailsItem.ts'
import Docs from './docs.mdx'

// // More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Custom Elements/Details',
  // component: DetailsGroup,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = ({ multiple }) => html`
  <details-group ?multiple=${multiple}>
    <details>
      <summary>Some details</summary>
      <p>More info about the details.</p>
    </details>
    <details>
      <summary>Some details</summary>
      <p>More info about the details.</p>
    </details>
    <details>
      <summary>Some details Some details Some details Some details</summary>
      <p>More info about the details.</p>
    </details>
  </details-group>
`

export const DetailsGroup = Template.bind({})
DetailsGroup.args = {
  multiple: false,
}

export const DetailsItemGroup = ({ multiple }) => html`
  <details-group ?multiple=${multiple}>
    <details-item part-classes='{ "summary": "abc" }' summary="This is the summary">
      More info about the details.
    </details-item>
    <details-item summary="This is the summary">
      More info about the details.
      More info about the details.
      More info about the details.
      More info about the details.
      More info about the details.
      More info about the details.
    </details-item>
    <details-item summary="This is the summary">
      More info about the details.
    </details-item>
  </details-group>
`
DetailsItemGroup.args = {
  multiple: false,
}

export const DetailsItem = () => html`
  <details-item summary="This is the summary">
    More info about the details.
  </details-item>
`
