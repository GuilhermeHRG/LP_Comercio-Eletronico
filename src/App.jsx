import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Rota para Login */}
          <Route path="/login" element={<Login />} />

          {/* Rota privada para Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Página inicial */}
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
