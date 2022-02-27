import Color from 'color'
import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import Docs from './docs.mdx';
import './toggle.css'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'CSS Only/Toggle',
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    checked: true,
    disabled: false,
    size: {
      control: { type: 'select' },
      options: ['1rem', '1.5rem', '2rem'],
      table: {
        defaultValue: '1.5rem',
      },
    },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const hsl = (hex) => {
  const color = new Color(hex)
  return hex
    ? `${color.hue()} ${color.saturationl()}% ${color.lightness()}%`
    : ''
}

const Template = (args) => {
  const styles = {}
  Object.assign(styles, args.color ? {'--chkc': hsl(args.color)} : {})
  Object.assign(styles, args.backgroundColor ? {'--chkbg': hsl(args.backgroundColor)} : {})
  Object.assign(styles, args.size ? {'--chkbs': args.size} : {})
  
  return html`
    <input
      type="checkbox"
      ?disabled="${args.disabled}"
      ?checked="${args.checked}"
      class="toggle"
      style=${styleMap(styles)}
      role="switch"
    />
  `
}

export const Default = Template.bind({})

export const Checked = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Checked.args = {
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const CustomSize = Template.bind({})
CustomSize.args = {
  size: '2rem',
}
