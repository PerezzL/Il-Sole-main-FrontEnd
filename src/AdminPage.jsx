import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Collapse, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';

const initialUsers = [
  { id: 1, name: 'Lucas', email: 'lucas@example.com', role: 'admin', password: '' },
  { id: 2, name: 'Juan', email: 'juan@example.com', role: 'user', password: '' },
];

const sectores = [
  {
    key: 'recepcion',
    label: 'Recepción',
    endpoint: 'recepcion',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'materiaPrima', label: 'Materia Prima' },
      { key: 'control1', label: 'Control Transporte' },
      { key: 'control2', label: 'Control Envase' },
      { key: 'control3', label: 'Control Rotulado' },
      { key: 'marca', label: 'Marca' },
      { key: 'proveedor', label: 'Proveedor' },
      { key: 'cant', label: 'Cantidad' },
      { key: 'nroRemito', label: 'Nro Remito' },
      { key: 'temp', label: 'Temperatura' },
      { key: 'fechaElaborado', label: 'Fecha Elaborado' },
      { key: 'fechaVTO', label: 'Fecha Vto.' },
      { key: 'lote', label: 'Lote' },
    ],
    filtros: ['lote', 'materiaPrima', 'proveedor'],
  },
  {
    key: 'production',
    label: 'Producción',
    endpoint: 'production',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'producto', label: 'Producto' },
      { key: 'materiaPrima', label: 'Materia Prima' },
      { key: 'lote', label: 'Lote' },
      { key: 'planProduccion', label: 'Plan Producción' },
      { key: 'produccion', label: 'Producción' },
      { key: 'pesoDescarte', label: 'Peso Descarte' },
      { key: 'observaciones', label: 'Observaciones' },
      { key: 'comentarios', label: 'Comentarios' },
    ],
    filtros: ['lote', 'producto', 'materiaPrima'],
  },
  {
    key: 'control-pesado',
    label: 'Control Pesado',
    endpoint: 'control-pesado',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'producto', label: 'Producto' },
      { key: 'ingrediente', label: 'Ingrediente' },
      { key: 'materiaPrima', label: 'Materia Prima' },
      { key: 'fecha', label: 'Fecha' },
      { key: 'lote', label: 'Lote' },
      { key: 'cantidad', label: 'Cantidad' },
      { key: 'observaciones', label: 'Observaciones' },
    ],
    filtros: ['lote', 'producto', 'materiaPrima'],
  },
  {
    key: 'envasado',
    label: 'Envasado',
    endpoint: 'envasado',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'loteProd', label: 'Lote Producción' },
      { key: 'loteEnvasado', label: 'Lote Envasado' },
      { key: 'producto', label: 'Producto' },
      { key: 'cantEnvases', label: 'Cantidad Envases' },
      { key: 'cantDescarte', label: 'Cantidad Descarte' },
      { key: 'observaciones', label: 'Observaciones' },
    ],
    filtros: ['loteProd', 'loteEnvasado', 'producto'],
  },
  {
    key: 'expendio',
    label: 'Expendio',
    endpoint: 'expendio',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'producto', label: 'Producto' },
      { key: 'lote', label: 'Lote' },
      { key: 'destino', label: 'Destino' },
      { key: 'tempTransporte', label: 'Temp. Transporte' },
      { key: 'LimpTransporte', label: 'Limpieza Transporte' },
      { key: 'responsable', label: 'Responsable' },
    ],
    filtros: ['lote', 'producto', 'destino'],
  },
];

function getFiltrosIniciales(sector) {
  const obj = {};
  sector.filtros.forEach(f => obj[f] = '');
  return obj;
}

const AdminPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(false);
  const [sectorKey, setSectorKey] = useState('production');
  const [registros, setRegistros] = useState([]);
  const [filtros, setFiltros] = useState(getFiltrosIniciales(sectores.find(s => s.key === 'production')));

  const sector = sectores.find(s => s.key === sectorKey);

  const handleAddUser = (userData) => {
    if (userData.name && userData.email && userData.role && userData.password) {
      setUsers([...users, { id: users.length + 1, ...userData }]);
      setShowForm(false); // Ocultar formulario
      setFormError(false); // Resetear el error
    } else {
      setFormError(true); // Mostrar error si faltan campos
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/${sector.endpoint}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRegistros(data);
        } else if (Array.isArray(data.data)) {
          setRegistros(data.data);
        } else {
          setRegistros([]);
        }
      })
      .catch(() => setRegistros([]));
    setFiltros(getFiltrosIniciales(sector));
  }, [sectorKey]);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  // Filtrado dinámico
  const registrosFiltrados = Array.isArray(registros)
    ? registros.filter(r =>
        sector.filtros.every(f =>
          !filtros[f] || (r[f] && r[f].toString().toLowerCase().includes(filtros[f].toLowerCase()))
        )
      )
    : [];

  return (
    <>
      <Header />
      <Box p={{ base: 2, md: 8 }}>
        <Heading as="h1" mb={6} fontSize={{ base: '2xl', md: '3xl' }}>
          Panel de Administración
        </Heading>

        <Tabs variant="enclosed">
          <TabList>
            <Tab fontSize={{ base: 'sm', md: 'md' }}>Gestión de Usuarios</Tab>
            <Tab fontSize={{ base: 'sm', md: 'md' }}>Gestión de Registros</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Heading as="h2" size="lg" mb={4} fontSize={{ base: 'lg', md: 'xl' }}>
                Gestión de Usuarios
              </Heading>

              <Box overflowX="auto">
                <UserTable users={users} onDelete={handleDeleteUser} />
              </Box>

              <Button onClick={() => setShowForm(!showForm)} colorScheme="orange" mt={4} w={{ base: 'full', md: 'auto' }}>
                {showForm ? 'Cancelar' : 'Agregar Usuario'}
              </Button>

              <Collapse in={showForm} animateOpacity>
                <UserForm onSubmit={handleAddUser} formError={formError} />
              </Collapse>
            </TabPanel>

            <TabPanel>
              <Heading as="h2" size="lg" mb={4} fontSize={{ base: 'lg', md: 'xl' }}>
                Gestión de Registros
              </Heading>
              {/* Selector de sector y filtros */}
              <Box mb={4} display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'stretch', md: 'center' }} gap={2}>
                <Box mb={{ base: 2, md: 0 }}>
                  <label style={{ fontWeight: 600 }}>Sector:&nbsp;</label>
                  <select value={sectorKey} onChange={e => setSectorKey(e.target.value)} style={{ padding: 4, borderRadius: 4 }}>
                    {sectores.map(s => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </select>
                </Box>
                {/* Filtros dinámicos */}
                <Box display="flex" flexWrap="wrap" gap={2} w="full">
                  {sector.filtros.map(f => (
                    <Box key={f} display="flex" alignItems="center" gap={1} mb={{ base: 2, md: 0 }}>
                      <label style={{ fontWeight: 500 }}>{sector.columns.find(c => c.key === f)?.label || f}:&nbsp;</label>
                      <input
                        name={f}
                        value={filtros[f] || ''}
                        onChange={handleFiltroChange}
                        placeholder={`Buscar ${sector.columns.find(c => c.key === f)?.label || f}`}
                        style={{ padding: 4, borderRadius: 4, minWidth: 80 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              {/* Tabla dinámica */}
              <Box overflowX="auto" w="full">
                <table border="1" cellPadding="6" style={{ width: '100%', background: '#fff', borderCollapse: 'collapse', fontSize: 'clamp(12px, 2vw, 16px)' }}>
                  <thead style={{ background: '#f7c873' }}>
                    <tr>
                      {sector.columns.map(col => (
                        <th key={col.key} style={{ whiteSpace: 'nowrap', fontWeight: 700 }}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={sector.columns.length} style={{ textAlign: 'center', color: '#888' }}>
                          No hay registros para mostrar.
                        </td>
                      </tr>
                    ) : (
                      registrosFiltrados.map((registro, idx) => (
                        <tr key={idx}>
                          {sector.columns.map(col => (
                            <td key={col.key} style={{ whiteSpace: 'nowrap' }}>{registro[col.key] ?? ''}</td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Footer />
    </>
  );
};

export default AdminPage;
