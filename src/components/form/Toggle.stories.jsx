import { computed } from 'vue';
import Color from 'color'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Form',
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    checked: true,
    size: {
      control: { type: 'select' },
      options: ['1rem', '1.5rem', '2rem'],
      table: {
        defaultValue: '1.5rem'
      }
    },
  },
}

const hsl = (hex) => {
  const color = new Color(hex)
  return hex ? `${color.hue()} ${color.saturationl()}% ${color.lightness()}%` : ''
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  setup() {
    return {
      args,
      style: computed(() => ({
        "--chkc": hsl(args.color),
        "--chkbg": hsl(args.backgroundColor),
        "--chkbs": args.size || '1.5rem',
      })),
    }
  },
  template: `
    <input type="checkbox" :disabled="args.disabled" :checked="args.checked" class="toggle" :style="style">
  `,
})

export const Toggle = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Toggle.args = {
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
  disabled: true,
  checked: true,
}
