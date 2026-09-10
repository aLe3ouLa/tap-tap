import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Anchor } from './anchor';
import { AnchorLink } from '../anchor-link/anchor-link';

const meta: Meta<Anchor> = {
  title: 'Navigation/Anchor',
  component: Anchor,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<Anchor>;

export const Basic: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [AnchorLink] },
    props: args,
    template: `
      <ds-anchor [ariaLabel]="ariaLabel">
        <ds-anchor-link href="#title-one">Title One</ds-anchor-link>
        <ds-anchor-link href="#title-two">Title Two</ds-anchor-link>
        <ds-anchor-link href="#title-three">Title Three</ds-anchor-link>
        <ds-anchor-link href="#long-title">
          Long Title
          <ds-anchor-link href="#subtitle-one">Subtitle One</ds-anchor-link>
          <ds-anchor-link href="#subtitle-two">Subtitle Two</ds-anchor-link>
        </ds-anchor-link>
      </ds-anchor>
    `,
  }),
  args: {
    ariaLabel: 'Anchor',
  },
};
