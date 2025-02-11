import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ViewLeads from './components/module/leads/ViewLeads.tsx';
import AddOrEditLeads from './components/module/leads/AddOrEditLeads.tsx';
import AddOrEditProperty from './components/module/property/AddOrEditProperty.tsx';
import ViewProperty from './components/module/property/ViewProperty.tsx';

const RouterHome: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewLeads />} />
      
      <Route path="/leads/view" element={<ViewLeads />} />
      
      <Route path="/leads/add" element={<AddOrEditLeads />} />

      <Route path="/Property/view" element={<ViewProperty />} />
      <Route path="/Property/add" element={<AddOrEditProperty />} />
    </Routes>
  );
};

export default RouterHome;
