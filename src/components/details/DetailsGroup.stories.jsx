import './DetailsGroup.ts';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Details Group',
  // component: DetailsGroup,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  // components: { DetailsGroup },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <details-group v-bind="args">
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
  `,
  compilerOptions: {isCustomElement: (tag) => tag.includes('-')}
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  multiple: false,
};
