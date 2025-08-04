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
import ExchangeForm from "./components/ExchangeForm";
import { CurrencyRatesProvider } from "./contexts/currencyRatesContext";
import OpenAccountFormFirst from "./components/OpenAccountFormFirst";
import OpenAccountFormSecond from "./components/OpenAccountFormSecond";
import { AuthProvider } from "./contexts/authContext";
import { UserAccountsProvider } from "./contexts/UserAccountsContext";
function App() {
  return (
    <AuthProvider>
      <UserAccountsProvider>
        <CurrencyRatesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage></Homepage>}></Route>
              <Route path="open-account" element={<OpenAccount></OpenAccount>}>
                <Route
                  index
                  element={<Navigate replace to="1"></Navigate>}
                ></Route>
                <Route
                  path="1"
                  element={<OpenAccountFormFirst></OpenAccountFormFirst>}
                ></Route>
                <Route
                  path="2"
                  element={<OpenAccountFormSecond></OpenAccountFormSecond>}
                ></Route>
              </Route>
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
                <Route
                  path="exchange-form"
                  element={<ExchangeForm></ExchangeForm>}
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CurrencyRatesProvider>
      </UserAccountsProvider>
    </AuthProvider>
  );
}

export default App;
