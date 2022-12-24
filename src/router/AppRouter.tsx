import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { RutasPublicas } from './RutasPublicas';
import { RutasPrivadas } from './RutasPrivadas';

export const AppRouter = () =>
{
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth/*" element={<RutasPublicas />} />

        <Route path="/web/*" element={<RutasPrivadas />} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </HashRouter>
  );
};
