import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import backgroundImg from './images/background.png';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Container,
    useToast,
  } from "@chakra-ui/react";


const FormEnvasado = () => {
    const toast = useToast();

    const [formData, setFormData] = useState({
        producto: "",
        lote: "",
        destino: "",
        tempTransporte: "",
        LimpTransporte: "",
        responsable: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expendio`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast({
                  title: 'Registro guardado correctamente',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                  position: 'top',
                });
                setFormData({
                    producto: "",
                    lote: "",
                    destino: "",
                    tempTransporte: "",
                    LimpTransporte: "",
                    responsable: "",
                });
            } else {
                toast({
                  title: 'Error al guardar',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                  position: 'top',
                });
            }
        } catch (error) {
            toast({
              title: 'Error de conexión',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
            });
        }
    };

  return (
    <>
      <Header />
        <Box backgroundImage={`url(${backgroundImg})`}>
            <Container maxW={{ base: '100%', md: 'container.md' }} p={{ base: 2, md: 10 }}>
            <Box
                bg="orange.200"
                p={{ base: 4, md: 8 }}
                borderRadius="md"
                boxShadow="lg"
                borderColor="orange.600"
                borderWidth="1px"
            >
                <Heading mb={6} textAlign="center" color="orange.800" fontSize={{ base: '2xl', md: '3xl' }}>
                Registro de Datos - Expendio
                </Heading>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={4} w="full">
                        <FormControl id="producto">
                        <FormLabel>Producto</FormLabel>
                        <Input
                            type="text"
                            name="producto"
                            value={formData.producto}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="lote">
                        <FormLabel>Lote</FormLabel>
                        <Input
                            type="number"
                            name="lote"
                            value={formData.lote}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="destino">
                        <FormLabel>Destino</FormLabel>
                        <Input
                            type="text"
                            name="destino"
                            value={formData.destino}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="tempTransporte">
                        <FormLabel>Temperatura del Transporte</FormLabel>
                        <Input
                            type="number"
                            name="tempTransporte"
                            value={formData.tempTransporte}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="limpTransporte">
                        <FormLabel>Limpieza de Transporte</FormLabel>
                        <Input
                            type="text"
                            name="limpTrasnporte"
                            value={formData.LimpTransporte}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="responsable">
                        <FormLabel>Responsable del Envio</FormLabel>
                        <Input
                            type="text"
                            name="responsable"
                            value={formData.responsable}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <Button colorScheme="orange" type="submit" size="lg" w="full">
                        Enviar
                        </Button>
                    </VStack>
                </form>
            </Box>
            </Container>
        </Box>
      <Footer />
    </>
  )
}

export default FormEnvasado