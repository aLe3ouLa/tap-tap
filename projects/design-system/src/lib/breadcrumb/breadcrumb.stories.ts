import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbItem } from '../breadcrumb-item/breadcrumb-item';

const meta: Meta<Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<Breadcrumb>;

export const Basic: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [BreadcrumbItem] },
    props: args,
    template: `
      <ds-breadcrumb [ariaLabel]="ariaLabel">
        <ds-breadcrumb-item href="/">Homepage</ds-breadcrumb-item>
        <ds-breadcrumb-item href="/target">Target</ds-breadcrumb-item>
        <ds-breadcrumb-item href="/target/tag">Tag</ds-breadcrumb-item>
        <ds-breadcrumb-item href="/target/tag/developer-settings">Developer Settings</ds-breadcrumb-item>
        <ds-breadcrumb-item>Authority</ds-breadcrumb-item>
      </ds-breadcrumb>
    `,
  }),
  args: {
    ariaLabel: 'Breadcrumb',
  },
};

export const Truncated: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [BreadcrumbItem] },
    props: args,
    template: `
      <ds-breadcrumb [ariaLabel]="ariaLabel" [maxItems]="maxItems">
        <ds-breadcrumb-item href="/">Homepage</ds-breadcrumb-item>
        <ds-breadcrumb-item href="/target">Target</ds-breadcrumb-item>
        <ds-breadcrumb-item href="/target/tag">Tag</ds-breadcrumb-item>
        <ds-breadcrumb-item href="/target/tag/developer-settings">Developer Settings</ds-breadcrumb-item>
        <ds-breadcrumb-item>Authority</ds-breadcrumb-item>
      </ds-breadcrumb>
    `,
  }),
  args: {
    ariaLabel: 'Breadcrumb',
    maxItems: 2,
  },
};
