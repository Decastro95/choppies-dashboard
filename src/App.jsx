import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Dashboard/Admin";
import Manager from "./pages/Dashboard/Manager";
import Cashier from "./pages/Dashboard/Cashier";
import Supplier from "./pages/Dashboard/Supplier";
import Ceo from "./pages/Dashboard/Ceo";
import Unauthorized from "./components/Unauthorized";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/manager" element={<Manager />} />
          <Route path="/dashboard/cashier" element={<Cashier />} />
          <Route path="/dashboard/supplier" element={<Supplier />} />
          <Route path="/dashboard/ceo" element={<Ceo />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
