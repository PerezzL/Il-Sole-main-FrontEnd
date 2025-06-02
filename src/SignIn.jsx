import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import backgroundImg from './images/background.png';
import logo  from './images/logo.png';
import { Link } from  'react-router-dom';



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Iniciar sesión con:', email, password);
    if (email && password) {
      console.log('Iniciar sesión con:', email, password);
      // Redirige a la página principal ('/')
      navigate('/');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <>
    <Box>
        <Flex bg="#660033" p='1.5%' alignItems="center" justifyContent="space-between">
            <Box flex="1" display="flex" justifyContent="center">
              <Link to="/">
                <Box as="img" src={logo} alt="Logo" boxSize="55px" h="100%" />
              </Link>
            </Box>
        </Flex>
    </Box>
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage={`url(${backgroundImg})`}
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="2xl"
        w="sm"
        transform="scale(1)"
        transition="transform 0.3s"
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="gray.800">
          Bienvenido
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.100"
              borderColor="gray.300"
              _hover={{ borderColor: 'orange.500' }}
              _focus={{ borderColor: 'orange.500', boxShadow: 'outline' }}
            />
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.100"
                borderColor="gray.300"
                _hover={{ borderColor: 'orange.500' }}
                _focus={{ borderColor: 'orange.500', boxShadow: 'outline' }}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Mostrar/ocultar contraseña"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            backgroundColor='#DE8F18'
            color='white'
            w="full"
            size="lg"
            leftIcon={<ViewIcon />}
            _hover={{ bg: 'orange.600' }}
          >
            Iniciar sesión
          </Button>
        </form>
      </Box>
    </Box>
    </>
  );
};

export default SignIn;