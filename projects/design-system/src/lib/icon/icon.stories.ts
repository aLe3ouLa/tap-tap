import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Icon } from './icon';
import { ICON_NAMES } from './icon-names';

const meta: Meta<Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<Icon>;

export const Default: Story = { args: { name: 'add' } };

export const AllIcons: Story = {
  render: () => ({
    props: { names: ICON_NAMES },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, 96px); gap: 16px;">
        @for (n of names; track n) {
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11px; color: black;">
            <ds-icon [name]="n" style="--ds-icon-size: 1.5rem;" />
            <span>{{ n }}</span>
          </div>
        }
      </div>
    `,
  }),
};
