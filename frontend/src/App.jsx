import { BrowserRouter, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import DriverRoutes from "./routes/DriverRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
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
