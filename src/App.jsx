import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import OpenAccount from "./pages/OpenAccount";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import TransferHistory from "./components/TransferHistory";
import NewTransfer from "./components/NewTransfer";
import { Navigate } from "react-router-dom";
import CurrencyExchange from "./components/CurrencyExchange";
import ExchangeForm from "./components/ExchangeForm";
import { CurrencyRatesProvider } from "./contexts/currencyRatesContext";
import OpenAccountFormFirst from "./components/OpenAccountFormFirst";
import OpenAccountFormSecond from "./components/OpenAccountFormSecond";
import { AuthProvider } from "./contexts/authContext";
import { UserAccountsProvider } from "./contexts/UserAccountsContext";
import NewAccountLayout from "./pages/NewAccountLayout";
import AccountTypePicker from "./components/AccountTypePicker";
import CurrencyAccountForm from "./components/CurrencyAccountForm";
import GoalAccountForm from "./components/GoalAccountForm";
import GoalAccountDetails from "./components/GoalAccountDetails";
import CurrencyCharts from "./components/CurrencyCharts";
import GoalAccounts from "./components/GoalAccounts";

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
                  element={<NewTransfer></NewTransfer>}
                ></Route>
                <Route
                  path="cantor"
                  element={<CurrencyExchange></CurrencyExchange>}
                >
                  <Route
                    index
                    element={<CurrencyCharts></CurrencyCharts>}
                  ></Route>
                  <Route
                    path="exchange"
                    element={<ExchangeForm></ExchangeForm>}
                  ></Route>
                </Route>
                <Route
                  path="goals"
                  element={<GoalAccounts></GoalAccounts>}
                ></Route>
                <Route
                  path="goal-progress"
                  element={<GoalAccountDetails></GoalAccountDetails>}
                ></Route>
                <Route
                  path="new-account"
                  element={<NewAccountLayout></NewAccountLayout>}
                >
                  <Route
                    index
                    element={<AccountTypePicker></AccountTypePicker>}
                  ></Route>
                  <Route
                    path="currency"
                    element={<CurrencyAccountForm></CurrencyAccountForm>}
                  ></Route>
                  <Route
                    path="goal"
                    element={<GoalAccountForm></GoalAccountForm>}
                  ></Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CurrencyRatesProvider>
      </UserAccountsProvider>
    </AuthProvider>
  );
}

export default App;
