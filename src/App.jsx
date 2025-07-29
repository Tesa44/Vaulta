import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import OpenAccount from "./pages/OpenAccount";
import AddPlant from "./pages/AddPlant";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage></Homepage>}></Route>
        <Route
          path="open-account"
          element={<OpenAccount></OpenAccount>}
        ></Route>
        <Route path="add-plant" element={<AddPlant></AddPlant>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="inventory" element={<Inventory></Inventory>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
