import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Select, Heading, VStack, useToast } from '@chakra-ui/react';
import backgroundImg from '../images/background.png';

const ControlPesado = () => {
  const [formData, setFormData] = useState({
    producto: '',
    ingrediente: '',
    materiaPrima: '',
    fecha: '',
    lote: '',
    cantidad: '',
    observaciones: '',
  });

  const toast = useToast();

  const productos = ['Empanadas de JyQ', 'Ravioles JyQ', 'Ñoquis', 'Pizza']; // Añadir más productos
  const ingredientesPorProducto = {
    'Empanadas de JyQ': ['Masa', 'Relleno'],
    'Ravioles JyQ': ['Masa', 'Relleno de JyQ'],
    'Ñoquis': ['Masa de ñoquis'],
    'Pizza': ['Masa de pizza']
  };
  const materiaPrimaPorIngrediente = {
    'Masa': ['Harina', 'Agua', 'Levadura'],
    'Relleno': ['Carne', 'Verduras', 'Condimentos'],
    // Añadir más materias primas según el ingrediente
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "producto") {
      // Resetear ingrediente y materia prima al cambiar de producto
      setFormData({ ...formData, producto: value, ingrediente: '', materiaPrima: '' });
    } else if (name === "ingrediente") {
      // Resetear materia prima al cambiar de ingrediente
      setFormData({ ...formData, ingrediente: value, materiaPrima: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/control-pesado`, {
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
          producto: '',
          ingrediente: '',
          materiaPrima: '',
          fecha: '',
          lote: '',
          cantidad: '',
          observaciones: '',
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
    <Box backgroundImage={`url(${backgroundImg})`}>
      <Container maxW={{ base: '100%', md: 'container.md' }} p={{ base: 2, md: 10 }}>
        <Box bg="orange.200" p={{ base: 4, md: 8 }} borderRadius="md" boxShadow="lg" borderColor="orange.600" borderWidth="1px">
          <Heading mb={6} textAlign="center" color="orange.800" fontSize={{ base: '2xl', md: '3xl' }}>
            Control de Pesado
          </Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4} w="full">
              <FormControl id="producto">
                <FormLabel>Producto</FormLabel>
                <Select
                  name="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  bg="white"
                  w="full"
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map((prod) => (
                    <option key={prod} value={prod}>
                      {prod}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {formData.producto && (
                <FormControl id="ingrediente">
                  <FormLabel>Ingrediente</FormLabel>
                  <Select
                    name="ingrediente"
                    value={formData.ingrediente}
                    onChange={handleChange}
                    bg="white"
                    w="full"
                  >
                    <option value="">Selecciona un ingrediente</option>
                    {ingredientesPorProducto[formData.producto].map((ing) => (
                      <option key={ing} value={ing}>
                        {ing}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {formData.ingrediente && (
                <FormControl id="materiaPrima">
                  <FormLabel>Materia Prima</FormLabel>
                  <Select
                    name="materiaPrima"
                    value={formData.materiaPrima}
                    onChange={handleChange}
                    bg="white"
                    w="full"
                  >
                    <option value="">Selecciona materia prima</option>
                    {materiaPrimaPorIngrediente[formData.ingrediente].map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {formData.materiaPrima && (
                <>
                  <FormControl id="lote" isRequired>
                    <FormLabel>Lote</FormLabel>
                    <Input
                      type="text"
                      name="lote"
                      value={formData.lote}
                      onChange={handleChange}
                      bg="white"
                      w="full"
                    />
                  </FormControl>
                  <FormControl id="cantidad" isRequired>
                    <FormLabel>Cantidad</FormLabel>
                    <Input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      bg="white"
                      w="full"
                    />
                  </FormControl>
                  <FormControl id="observaciones">
                    <FormLabel>Observaciones</FormLabel>
                    <Input
                      type="text"
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleChange}
                      bg="white"
                      w="full"
                    />
                  </FormControl>
                  <Button colorScheme="orange" type="submit" size="lg" w="full">
                    Guardar
                  </Button>
                </>
              )}
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ControlPesado;
