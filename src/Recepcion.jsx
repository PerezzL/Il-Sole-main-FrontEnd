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
    Select,
    Heading,
    VStack,
    HStack,
    Container,
    useToast,
  } from "@chakra-ui/react";

const Recepcion = () => {

    const [formData, setFormData] = useState({
        materiaPrima: "",
        control1: "",
        control2: "",
        control3: "",
        marca:"",
        proveedor: "",
        cant: "",
        nroRemito:"",
        temp: "",
        fechaElaborado: "",
        fechaVTO: "",
        lote: "",
      });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recepcion`, {
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
                    materiaPrima: "",
                    control1: "",
                    control2: "",
                    control3: "",
                    marca: "",
                    proveedor: "",
                    cant: "",
                    nroRemito: "",
                    temp: "",
                    fechaElaborado: "",
                    fechaVTO: "",
                    lote: "",
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
              Registro de Datos - Recepción
              </Heading>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <VStack spacing={4} w="full">
                      <FormControl id="materiaPrima">
                      <FormLabel>Materia Prima</FormLabel>
                      <Input
                          type="text"
                          name="materiaPrima"
                          value={formData.materiaPrima}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Control</FormLabel>
                        <HStack spacing={2} align="start" mb={4} flexWrap="wrap">
                            <Select
                            name="control1"
                            value={formData.control1}
                            onChange={handleChange}
                            placeholder="Transporte"
                            bg="white"
                            w={{ base: '100%', md: '33%' }}
                            >
                            <option value="control1 1">OK</option>
                            <option value="control1 2">Mal estado</option>
                            </Select>

                            <Select
                            name="control2"
                            value={formData.control2}
                            onChange={handleChange}
                            placeholder="Envase"
                            bg="white"
                            w={{ base: '100%', md: '33%' }}
                            >
                            <option value="control2 1">OK</option>
                            <option value="control2 2">Mal estado</option>
                            </Select>

                            <Select
                            name="control3"
                            value={formData.control3}
                            onChange={handleChange}
                            placeholder="Rotulado"
                            bg="white"
                            w={{ base: '100%', md: '33%' }}
                            >
                            <option value="control3 1">OK</option>
                            <option value="control3 2">Mal estado</option>
                            </Select>
                        </HStack>
                      </FormControl>

                      <FormControl id="marca">
                      <FormLabel>Marca</FormLabel>
                      <Input
                          type="text"
                          name="marca"
                          value={formData.marca}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl id="proveedor">
                      <FormLabel>Proveedor</FormLabel>
                      <Input
                          type="text"
                          name="proveedor"
                          value={formData.proveedor}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl id="cant">
                      <FormLabel>Cantidad</FormLabel>
                      <Input
                          type="number"
                          name="cant"
                          value={formData.cant}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl id="nroRemito">
                      <FormLabel>Nro° Remito</FormLabel>
                      <Input
                          type="number"
                          name="nroRemito"
                          value={formData.nroRemito}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl id="temp">
                      <FormLabel>Temperatura</FormLabel>
                      <Input
                          type="number"
                          name="temp"
                          value={formData.temp}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl id="fechaElaborado">
                      <FormLabel>Fecha de Elaborado</FormLabel>
                      <Input
                          type="date"
                          name="fechaElaborado"
                          value={formData.fechaElaborado}
                          onChange={handleChange}
                          bg="white"
                          w="full"
                      />
                      </FormControl>

                      <FormControl id="fechaVTO">
                      <FormLabel>Fecha de Vencimiento</FormLabel>
                      <Input
                          type="date"
                          name="fechaVTO"
                          value={formData.fechaVTO}
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

export default Recepcion