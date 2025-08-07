import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import CustomerSidebar from './CustomerSidebar'; // adjust path if needed

const CustomerLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CustomerSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CustomerLayout;
