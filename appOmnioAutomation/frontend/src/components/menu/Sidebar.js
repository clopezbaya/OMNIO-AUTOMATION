import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent backgroundColor='gray.50'>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading size='lg' color='teal.500'>
            Menu
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <VStack align='start' spacing={4}>
            {/* Link para ir a TestExecution */}
            <Link to='/' onClick={onClose}>
              <Button w='100%' size='lg' colorScheme='teal' variant='outline'>
                Execute Test Cases
              </Button>
            </Link>

            {/* Link para ir a HistoryExecution */}
            <Link to='/History' onClick={onClose}>
              <Button w='100%' size='lg' colorScheme='teal' variant='outline'>
                History
              </Button>
            </Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
