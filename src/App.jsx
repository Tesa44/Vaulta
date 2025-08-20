import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CurrencyRatesProvider } from "./contexts/CurrencyRatesContext";
import { AuthProvider } from "./contexts/authContext";
import { UserAccountsProvider } from "./contexts/UserAccountsContext";
import Homepage from "./pages/Homepage";
import OpenAccount from "./pages/OpenAccount";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import NewAccountLayout from "./pages/NewAccountLayout";
import TransferHistory from "./features/transactions/TransferHistory";
import CurrencyExchange from "./features/currency-exchange/CurrencyExchange";
import ExchangeForm from "./features/currency-exchange/ExchangeForm";
import CurrencyCharts from "./features/currency-exchange/CurrencyCharts";
import OpenAccountUserInfoForm from "./features/register/OpenAccountUserInfoForm";
import OpenAccountAccountSetupForm from "./features/register/OpenAccountAccountSetupForm";
import AccountTypePicker from "./features/accounts/AccountTypePicker";
import CurrencyAccountForm from "./features/accounts/CurrencyAccountForm";
import GoalAccountForm from "./features/goals/GoalAccountForm";
import GoalAccountDetails from "./features/goals/GoalAccountDetails";
import GoalAccounts from "./features/goals/GoalAccounts";
import Users from "./features/users/Users";
import NewTransfer from "./features/transfer/NewTransfer";

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
                  element={<OpenAccountUserInfoForm></OpenAccountUserInfoForm>}
                ></Route>
                <Route
                  path="2"
                  element={
                    <OpenAccountAccountSetupForm></OpenAccountAccountSetupForm>
                  }
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
                <Route path="users" element={<Users></Users>}></Route>
                <Route
                  path="users/:id"
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
