import { html } from 'lit'
import './rating.css'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'CSS Only/Rating',
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    disabled: false,
    step: 1,
    size: {
      control: { type: 'select' },
      options: ['1rem', '1.5rem', '2rem'],
      table: {
        defaultValue: '1.5rem',
      },
    },
  },
}

const Template = (args) => html`
  <input
    type="range"
    ?disabled=${args.disabled}
    min="1"
    max=${args.max}
    step=${args.step}
    class="rating"
  />
`

export const Rating = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Rating.args = {
  disabled: false,
  max: 5,
  step: 1,
}
