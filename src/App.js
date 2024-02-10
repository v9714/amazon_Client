import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Screen/Home";
import ProductScreen from "./Screen/ProductScreen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import ShppingScreen from "./Screen/ShppingScreen";
import PaymentScreen from "./Screen/PaymentScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import LoginScreen from "./Screen/LoginScreen";
import NotFound from "./Screen/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <div style={{ minHeight: "calc(100vh - 73px)" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/shipping" element={<ShppingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
