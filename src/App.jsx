import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import OpenAccount from "./pages/OpenAccount";
import Login from "./pages/Login";
import BankDashboard from "./pages/BankDashboard";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage></Homepage>}></Route>
        <Route
          path="open-account"
          element={<OpenAccount></OpenAccount>}
        ></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="app" element={<AppLayout></AppLayout>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
