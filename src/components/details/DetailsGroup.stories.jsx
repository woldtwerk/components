import { html } from 'lit'
import './DetailsGroup.ts'

// // More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Custom Elements/Details Group',
  // component: DetailsGroup,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
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


export const Primary = Template.bind({})

Primary.args = {
  multiple: false
}