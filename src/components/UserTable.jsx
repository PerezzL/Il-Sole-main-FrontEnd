import React, { useState, useRef } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const UserTable = ({ users, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);  // Estado para controlar si el popup está abierto
  const [userToDelete, setUserToDelete] = useState(null);  // Usuario seleccionado para eliminar
  const cancelRef = useRef();  // Referencia al botón "Cancelar"

  const onDeleteConfirm = () => {
    if (userToDelete) {
      onDelete(userToDelete);  // Llamar a la función onDelete pasada como prop
    }
    setUserToDelete(null);  // Reiniciar el usuario a eliminar
    setIsOpen(false);  // Cerrar el popup
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);  // Guardar el usuario a eliminar
    setIsOpen(true);  // Abrir el popup de confirmación
  };

  return (
    <>
      <Box overflowX="auto" w="full">
        <Table variant="simple" fontSize={{ base: 'sm', md: 'md' }} minWidth="600px">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <IconButton
                    aria-label="Eliminar usuario"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDeleteClick(user.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}  // Cerrar el popup sin eliminar
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmación de Eliminación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>  {/* Botón para cancelar */}
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>  {/* Botón para confirmar */}
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserTable;
