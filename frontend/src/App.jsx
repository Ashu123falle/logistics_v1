import { BrowserRouter, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import DriverRoutes from "./routes/DriverRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useAuth } from "./context/AuthContext";
function App() {
  const { loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;

  return (
    
      <Routes>
        {PublicRoutes}
        {AdminRoutes}
        {DriverRoutes}
        {CustomerRoutes}
      </Routes>
    
  );
}

export default App;
