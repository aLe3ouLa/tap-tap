import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Radio } from './radio';

const meta: Meta<Radio> = {
  title: 'Inputs/Radio',
  component: Radio,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<Radio>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-radio [checked]="checked" [disabled]="disabled">Label</ds-radio>`,
  }),
  args: { checked: false, disabled: false },
};

export const Checked: Story = { ...Default, args: { ...Default.args, checked: true } };
export const Disabled: Story = { ...Default, args: { ...Default.args, disabled: true } };
export const DisabledChecked: Story = {
  ...Default,
  args: { ...Default.args, checked: true, disabled: true },
};
export const NoLabel: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-radio [checked]="checked" ariaLabel="Select item" />`,
  }),
  args: { checked: false },
};
