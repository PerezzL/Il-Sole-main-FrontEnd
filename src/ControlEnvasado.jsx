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
    Textarea,
    useToast,
  } from "@chakra-ui/react";

const ControlEnvasado = () => {
    const [formData, setFormData] = useState({
        loteProd: "",
        loteEnvasado: "",
        producto: "",
        cantEnvases: "",
        cantDescarte: "",
        observaciones: "",
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/envasado`, {
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
                    loteProd: "",
                    loteEnvasado: "",
                    producto: "",
                    cantEnvases: "",
                    cantDescarte: "",
                    observaciones: "",
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
              Registro de Datos - Envasado
              </Heading>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <VStack spacing={4} w="full">
                  <FormControl id="loteProd">
                      <FormLabel>Lote de Producción</FormLabel>
                      <Input
                          type="number"
                          name="loteProd"
                          value={formData.loteProd}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>
                    <FormControl id="loteEnvasado">
                      <FormLabel>Lote de Envasado</FormLabel>
                      <Input
                          type="number"
                          name="loteDescarte"
                          value={formData.loteEnavasdo}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>
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
                      <FormControl id="cantEnvases">
                      <FormLabel>Cantidad envases unitarios</FormLabel>
                      <Input
                          type="number"
                          name="cantEnvases"
                          value={formData.cantEnvases}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>
                      <FormControl id="cantDescarte">
                      <FormLabel>Cantidad de Descarte</FormLabel>
                      <Input
                          type="number"
                          name="cantDescarte"
                          value={formData.cantDescarte}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>
                      <FormControl id="observaciones">
                        <FormLabel>Observaciones (Indicar Fecha de produccion)</FormLabel>
                        <Textarea
                            name="observaciones"
                            value={formData.observaciones}
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

export default ControlEnvasado