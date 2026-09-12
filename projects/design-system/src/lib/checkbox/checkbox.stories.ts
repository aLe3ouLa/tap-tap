import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Checkbox } from './checkbox';

const meta: Meta<Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
};
export default meta;

type Story = StoryObj<Checkbox>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-checkbox [checked]="checked" [indeterminate]="indeterminate" [disabled]="disabled">Label</ds-checkbox>`,
  }),
  args: { checked: false, indeterminate: false, disabled: false },
};

export const Checked: Story = { ...Default, args: { ...Default.args, checked: true } };
export const Indeterminate: Story = { ...Default, args: { ...Default.args, indeterminate: true } };
export const Disabled: Story = { ...Default, args: { ...Default.args, disabled: true } };
export const DisabledChecked: Story = {
  ...Default,
  args: { ...Default.args, checked: true, disabled: true },
};
export const NoLabel: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-checkbox [checked]="checked" ariaLabel="Select item" />`,
  }),
  args: { checked: false },
};
