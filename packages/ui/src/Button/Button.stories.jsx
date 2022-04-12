import React from 'react';

import Button from '.';

export default {
  title: 'General/Button',
  component: Button,
};

function Template(args) {
  return <Button {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Button',
};

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  children: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Button',
};
