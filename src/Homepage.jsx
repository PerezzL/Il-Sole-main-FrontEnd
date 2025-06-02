import React from 'react';
import  { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text, Grid } from '@chakra-ui/react';
import backgroundImg from './images/background.png';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';


const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <Header />
        <Box backgroundImage={`url(${backgroundImg})`}
          backgroundSize="cover"
          backgroundPosition="center"
          height={{ base: 'auto', md: '85vh' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="md"
          px={{ base: 2, md: 0 }}
          py={{ base: 4, md: 0 }}>
          <Flex direction="column" alignItems="center" py={{ base: 4, md: 10 }}>
            <Heading as="h1" fontSize={{ base: '2xl', md: '7xl' }} mb={4} textAlign="center">
            IL Sole
            </Heading>
            <Text fontSize={{ base: 'md', md: 'xl' }} mb={6} textAlign="center">
            Registro de Datos
            </Text>
          </Flex>
        </Box>

        <Flex justifyContent="center" alignContent="center">
            <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)' }} gap={4} w={{ base: '98%', md: '90%' }} marginY={{ base: 4, md: '30px' }}>
              <Button onClick={() => handleNavigation('/recepcion')} backgroundColor="#DE8F18" h={{ base: '60px', md: '200px' }} _hover={{ backgroundColor: "#BF6F15" }} fontSize={{ base: 'sm', md: 'lg' }} w="full">RECEPCION DE MERCADERIA</Button>
              <Button onClick={() => handleNavigation('/produccion')} backgroundColor="#DE8F18" h={{ base: '60px', md: '200px' }} _hover={{ backgroundColor: "#BF6F15" }} fontSize={{ base: 'sm', md: 'lg' }} w="full">PRODUCCION</Button>
              <Button onClick={() => handleNavigation('/producto-pesados')} backgroundColor="#DE8F18" h={{ base: '60px', md: '200px' }} _hover={{ backgroundColor: "#BF6F15" }} fontSize={{ base: 'sm', md: 'lg' }} w="full">PRODUCTOS PESADOS</Button>
              <Button onClick={() => handleNavigation('/productos-envasados')} backgroundColor="#DE8F18" h={{ base: '60px', md: '200px' }} _hover={{ backgroundColor: "#BF6F15" }} fontSize={{ base: 'sm', md: 'lg' }} w="full">PRODUCTOS ENVASADOS</Button>
              <Button onClick={() => handleNavigation('/expendio')} backgroundColor="#DE8F18" h={{ base: '60px', md: '200px' }} _hover={{ backgroundColor: "#BF6F15" }} fontSize={{ base: 'sm', md: 'lg' }} w="full">CONTROL EXPENDIO</Button>
              <Button onClick={() => handleNavigation('/admin')} backgroundColor="#DE8F18" h={{ base: '60px', md: '200px' }} _hover={{ backgroundColor: "#BF6F15" }} fontSize={{ base: 'sm', md: 'lg' }} w="full">PANEL DE ADMINISTRADOR</Button>
            </Grid>
        </Flex>
      <Footer />
    </Box>
  )
}

export default Homepage;