import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo  from '../images/logo.png';
import SignIn from '../SignIn';

const Header = () => {
  return (
    <Box w="full">
        <Flex bg="#660033" p={{ base: 2, md: '1.5%' }} alignItems="center" justifyContent="space-between" flexDirection={{ base: 'column', md: 'row' }}>
            <Box flex="1" display="flex" justifyContent="center" ml={{ base: 0, md: '10.3%' }} mb={{ base: 2, md: 0 }}>
              <Link to="/">
                <Box as="img" src={logo} alt="Logo" boxSize={{ base: '40px', md: '55px' }} h="100%" />
              </Link>
            </Box>
            <Link to='/SignIn'>
              <Button backgroundColor="#DE8F18" color="white" _hover={{ backgroundColor: "#BF6F15" }} w={{ base: 'full', md: 'auto' }} fontSize={{ base: 'sm', md: 'md' }}>
                  Iniciar sesión
              </Button>
            </Link> 
        </Flex>
    </Box>
  )
}

export default Header