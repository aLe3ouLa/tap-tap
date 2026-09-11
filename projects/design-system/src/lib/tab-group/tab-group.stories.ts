import type { Meta, StoryObj } from '@storybook/angular-vite';
import { TabGroup } from './tab-group';
import { Tab } from '../tab/tab';

const meta: Meta<TabGroup> = {
  title: 'Navigation/Tabs',
  component: TabGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<TabGroup>;

export const Basic: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Tab] },
    props: args,
    template: `
      <ds-tab-group [variant]="variant" [size]="size" [align]="align" [bordered]="bordered" [selectedIndex]="selectedIndex">
        <ds-tab>Tab</ds-tab>
        <ds-tab>Tab</ds-tab>
        <ds-tab>Tab</ds-tab>
        <ds-tab>Tab</ds-tab>
        <ds-tab [disabled]="true">Tab</ds-tab>
      </ds-tab-group>
    `,
  }),
  args: {
    variant: 'line',
    size: 'default',
    align: 'left',
    bordered: true,
    selectedIndex: 0,
  },
};

export const Small: Story = {
  ...Basic,
  args: {
    ...Basic.args,
    size: 'small',
  },
};

export const Centered: Story = {
  ...Basic,
  args: {
    ...Basic.args,
    align: 'center',
  },
};

export const Container: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [Tab] },
    props: args,
    template: `
      <ds-tab-group [variant]="variant" [bordered]="bordered" [selectedIndex]="selectedIndex">
        <ds-tab [closable]="true">Tab</ds-tab>
        <ds-tab [closable]="true">Tab</ds-tab>
        <ds-tab [closable]="true">Tab</ds-tab>
        <ds-tab [closable]="true" [disabled]="true">Tab</ds-tab>
      </ds-tab-group>
    `,
  }),
  args: {
    variant: 'card',
    bordered: true,
    selectedIndex: 0,
  },
};
