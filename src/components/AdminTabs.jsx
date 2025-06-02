import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const AdminTabs = ({ children }) => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Usuarios</Tab>
        <Tab>Registros</Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </Tabs>
  );
};

export default AdminTabs;
