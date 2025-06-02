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
    Textarea,
    Heading,
    VStack,
    HStack,
    Container,
    useToast,
  } from "@chakra-ui/react";

const FormProduccion = () => {

    const [formData, setFormData] = useState({
        producto: "",
        materiaPrima: "",
        lote: "",
        planProduccion: "",
        produccion: "",
        pesoDescarte: "",
        observaciones: "",
        comentarios: "",
      });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/production`, {
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
                    materiaPrima: "",
                    lote: "",
                    planProduccion: "",
                    produccion: "",
                    pesoDescarte: "",
                    observaciones: "",
                    comentarios: "",
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
                Registro de Datos - Producción
                </Heading>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={4} w="full">
                        <HStack spacing={4} align="start" mb={4} flexWrap="wrap" w="full">
                            <FormControl id="producto" w={{ base: '100%', md: '50%' }}>
                            <FormLabel>Producto</FormLabel>
                            <Select
                                name="producto"
                                value={formData.producto}
                                onChange={handleChange}
                                placeholder="Seleccionar"
                                bg="white"
                                w="full"
                            >
                                <option value="Producto 1">Empanada de Jamón y Queso</option>
                                <option value="Producto 2">Empanada de Carne</option>
                                <option value="Producto 3">Ravioles PV</option>
                                <option value="Producto 4">Ravioles Jamón y Queso</option>
                                <option value="Producto 5">Pizza</option>
                                <option value="Producto 6">Figacita</option>
                                <option value="Producto 7">Ñoquis</option>
                                <option value="Producto 8">Bocaditos</option>
                            </Select>
                            </FormControl>

                            <FormControl id="materiaPrima" w={{ base: '100%', md: '50%' }}>
                            <FormLabel>Materia Prima</FormLabel>
                            <Select
                                name="materiaPrima"
                                value={formData.materiaPrima}
                                onChange={handleChange}
                                placeholder="Seleccionar"
                                bg="white"
                                w="full"
                            >
                                <option value="Materia Prima 1">Materia Prima 1</option>
                                <option value="Materia Prima 2">Materia Prima 2</option>
                            </Select>
                            </FormControl>
                        </HStack>
                        <FormControl id="lote">
                        <FormLabel>Lote de MP/PREP</FormLabel>
                        <Input
                            type="number"
                            name="lote"
                            value={formData.lote}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="produccion">
                        <FormLabel>Producción</FormLabel>
                        <Input
                            type="text"
                            name="produccion"
                            value={formData.produccion}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="planProduccion">
                        <FormLabel>Plan de Producción</FormLabel>
                        <Input
                            type="text"
                            name="planProduccion"
                            value={formData.planProduccion}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="pesoDescarte">
                        <FormLabel>Peso de Descarte</FormLabel>
                        <Input
                            type="number"
                            name="pesoDescarte"
                            value={formData.pesoDescarte}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="observaciones">
                        <FormLabel>Observaciones (Indicar Fecha de Envasado)</FormLabel>
                        <Textarea
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={handleChange}
                            bg="white"
                            w="full"
                        />
                        </FormControl>

                        <FormControl id="comentarios">
                        <FormLabel>Comentarios</FormLabel>
                        <Textarea
                            name="comentarios"
                            value={formData.comentarios}
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
);
};

export default FormProduccion;