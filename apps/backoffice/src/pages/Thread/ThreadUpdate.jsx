import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@kwd/ui';

import Box from '../../components/Box';
import { useThreads } from '../../state/threads/hook';

function ThreadUpdate() {
  const { error, handleView, handleDelete } = useThreads();
  const { slug } = useParams();

  const [thread, setThread] = useState();

  useEffect(() => {
    setThread(handleView({ slug }));
  }, [slug, handleView]);

  return (
    <>
      <Box className="flex flex-row justify-between text-lg font-medium">
        <span>Thread Update</span>
        {!error && (
          <Button onClick={() => handleDelete({ slug })}>Delete</Button>
        )}
      </Box>
      <Box>
        {JSON.stringify(error)}
        {JSON.stringify(thread)}
      </Box>
    </>
  );
}

export default ThreadUpdate;
