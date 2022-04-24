import React from 'react';

import Input from '.';

export default {
  title: 'Data Input/Input',
  component: Input,
};

function Template(args) {
  return <Input {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Name',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Name',
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Name',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Name',
  size: 'lg',
};
