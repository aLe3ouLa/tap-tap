import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost', 'link'] },
  },
};
export default meta;

type Story = StoryObj<Button>;

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-button [size]="size" [variant]="variant" [type]="type" [disabled]="disabled">Click me</ds-button>`,
  }),
  args: {
    variant: 'primary',
    type: 'button',
    disabled: false,
    size: 'medium',
  },
};

export const Outline: Story = { ...Primary, args: { ...Primary.args, variant: 'outline' } };
export const Ghost: Story = { ...Primary, args: { ...Primary.args, variant: 'ghost' } };
export const Link: Story = { ...Primary, args: { ...Primary.args, variant: 'link' } };
export const Disabled: Story = { ...Primary, args: { ...Primary.args, disabled: true } };
