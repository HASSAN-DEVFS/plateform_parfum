

import { Routes , Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Connexion from './components/Pages/Connexion';
import Inscription from './components/Pages/Inscription';
import Acceuil from './components/Pages/Acceuil';


function App() {
  const token = localStorage.getItem("token"); // Récupère le token

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route
          path="/dashboard"
          element={token ? <Acceuil /> : <Navigate to="/connexion" replace />}
        />
        <Route path="*" element={<Navigate to="/connexion" replace />} />
      </Routes>
    </>
  );
}


export default App
