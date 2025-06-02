import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import logo  from '../images/logo.png';

const Footer = () => {
  return (
    <Box w="full">
        <Flex bg="#660033" p={{ base: 2, md: 4 }} justifyContent="start" alignItems="center">
            <Box as="img" src={logo} alt="Footer Logo" boxSize={{ base: '40px', md: '55px' }} ml={{ base: 1, md: '3.5%' }} h="20%"/>
        </Flex>
    </Box>
  )
}

export default Footer