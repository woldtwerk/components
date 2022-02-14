import { html } from 'lit-html';
import './UpCounter.ts';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Up Counter',
  // component: DetailsGroup,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
// const Template = (args) => ({
//   // Components used in your story `template` are defined in the `components` object
//   // components: { DetailsGroup },
//   // The story's `args` need to be mapped into the template through the `setup()` method
//   setup() {
//     return { args };
//   },
//   // And then the `args` are bound to your component with `v-bind="args"`
//   // template: `
//   //   <up-counter value="50.000"></up-counter>
//   // `,
//   template: html`<up-counter value="50.000"></up-counter>`,
//   compilerOptions: {isCustomElement: (tag) => tag.includes('-')}
// });

// export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Primary.args = {
//   value: '50.000',
// };

export const Primary = () => html`<up-counter value="50000"></up-counter>`

