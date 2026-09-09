import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Button } from './button';
import { Icon } from '../icon/icon';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost', 'link', 'danger'] },
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
export const Danger: Story = { ...Primary, args: { ...Primary.args, variant: 'danger' } };
export const Disabled: Story = { ...Primary, args: { ...Primary.args, disabled: true } };

export const WithIconStart: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Icon] },
    props: args,
    template: `
      <ds-button [size]="size" [variant]="variant" [type]="type" [disabled]="disabled">
        <ds-icon icon-start name="download" />
        Download
      </ds-button>
    `,
  }),
  args: { ...Primary.args },
};

export const WithIconEnd: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Icon] },
    props: args,
    template: `
      <ds-button [size]="size" [variant]="variant" [type]="type" [disabled]="disabled">
        Next
        <ds-icon icon-end name="arrow-right" />
      </ds-button>
    `,
  }),
  args: { ...Primary.args },
};

export const IconOnly: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Icon] },
    props: args,
    template: `
      <ds-button [size]="size" [variant]="variant" [type]="type" [disabled]="disabled" [iconOnly]="true" ariaLabel="Settings">
        <ds-icon name="setting" />
      </ds-button>
    `,
  }),
  args: { ...Primary.args },
};
