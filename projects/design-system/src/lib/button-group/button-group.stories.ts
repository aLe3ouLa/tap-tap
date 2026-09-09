import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ButtonGroup } from './button-group';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

const meta: Meta<ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ButtonGroup>;

export const Default: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Button] },
    props: args,
    template: `
      <ds-button-group [ariaLabel]="ariaLabel">
        <ds-button variant="outline">Text</ds-button>
        <ds-button variant="outline">Text</ds-button>
        <ds-button variant="outline">Text</ds-button>
      </ds-button-group>
    `,
  }),
  args: {
    ariaLabel: 'Button group',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Button] },
    props: args,
    template: `
      <ds-button-group [ariaLabel]="ariaLabel">
        <ds-button variant="outline">Text</ds-button>
        <ds-button variant="outline" [disabled]="true">Text</ds-button>
        <ds-button variant="outline">Text</ds-button>
      </ds-button-group>
    `,
  }),
  args: {
    ariaLabel: 'Button group',
  },
};

export const IconOnly: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Button, Icon] },
    props: args,
    template: `
      <ds-button-group [ariaLabel]="ariaLabel">
        <ds-button variant="outline" [iconOnly]="true" ariaLabel="Settings">
        <ds-icon name="setting" />
      </ds-button>
      <ds-button variant="outline" [iconOnly]="true" ariaLabel="Settings">
        <ds-icon name="setting" />
      </ds-button>
        <ds-button variant="outline" [iconOnly]="true" ariaLabel="Settings">
        <ds-icon name="setting" />
      </ds-button>
      </ds-button-group>
    `,
  }),
  args: {
    ariaLabel: 'Button group',
  },
};
