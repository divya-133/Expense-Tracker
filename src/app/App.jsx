import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FinanceProvider } from "../context/FinanceContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Budgets from "../pages/Budgets";
import Savings from "../pages/Savings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route
            path="/"
            element={<LandingPage isLoggedIn={isLoggedIn} />}
          />

          <Route
  path="/login"
  element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
/>

          <Route path="/register" element={<RegisterPage />} />

          {/* ===== PROTECTED ROUTES ===== */}
          <Route
            path="/app"
            element={
              isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="savings" element={<Savings />} />
          </Route>

          {/* ===== CATCH ALL ===== */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
