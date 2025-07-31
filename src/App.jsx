import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import OpenAccount from "./pages/OpenAccount";
import Login from "./pages/Login";
import BankDashboard from "./pages/BankDashboard";
import AppLayout from "./pages/AppLayout";
import TransferHistory from "./components/TransferHistory";
import TransferForm from "./components/TransferForm";
import { Navigate } from "react-router-dom";
import CurrencyExchange from "./components/CurrencyExchange";

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
        <Route path="app" element={<AppLayout></AppLayout>}>
          <Route
            index
            element={<Navigate replace to="history"></Navigate>}
          ></Route>
          <Route
            path="history"
            element={<TransferHistory></TransferHistory>}
          ></Route>
          <Route
            path="new-transfer"
            element={<TransferForm></TransferForm>}
          ></Route>
          <Route
            path="cantor"
            element={<CurrencyExchange></CurrencyExchange>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
