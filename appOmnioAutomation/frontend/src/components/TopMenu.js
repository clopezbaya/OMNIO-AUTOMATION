import React from 'react';
import { Center, Stack, Box, Button, Link } from '@chakra-ui/react';
import { SpinnerIcon, TimeIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

const TopMenu = () => {
  return (
    <Center>
      <Box m={10}>
        <Stack direction='row' spacing={4}>
          <Link as={NavLink} to='/'>
            <Button
              rightIcon={<SpinnerIcon />}
              colorScheme='teal'
              variant='outline'
            >
              Execute Tests
            </Button>
          </Link>
          <Link as={NavLink} to='/History'>
            <Button
              rightIcon={<TimeIcon />}
              colorScheme='teal'
              variant='outline'
            >
              History
            </Button>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
};

export default TopMenu;
