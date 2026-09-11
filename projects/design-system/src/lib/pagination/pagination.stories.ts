import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Pagination } from './pagination';

const meta: Meta<Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    total: 85,
    page: 2,
    pageSize: 10,
  },
};
export default meta;

type Story = StoryObj<Pagination>;

export const Simple: Story = {
  args: {
    total: 124,
    page: 22,
    pageSize: 1,
    simple: true,
  },
};

export const Basic: Story = {
  args: {
    total: 50,
    page: 3,
    pageSize: 10,
  },
};

export const Advanced: Story = {
  args: {
    total: 500,
    page: 7,
    pageSize: 10,
  },
};

export const WithQuickJumper: Story = {
  args: {
    total: 500,
    page: 7,
    pageSize: 10,
    showQuickJumper: true,
  },
};

export const List: Story = {
  args: {
    total: 85,
    page: 2,
    pageSize: 10,
    showTotal: true,
    showSizeChanger: true,
    showQuickJumper: true,
  },
};

export const Disabled: Story = {
  args: {
    total: 85,
    page: 2,
    pageSize: 10,
    showTotal: true,
    showSizeChanger: true,
    showQuickJumper: true,
    disabled: true,
  },
};
