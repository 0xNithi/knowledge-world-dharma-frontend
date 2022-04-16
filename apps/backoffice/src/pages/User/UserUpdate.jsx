import React from 'react';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';

function UserUpdate() {
  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>User Update</span>
        <Button>Delete</Button>
      </Box>
      <Box>Content</Box>
    </>
  );
}

export default UserUpdate;
