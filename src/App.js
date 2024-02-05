import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import Home from "./component/Screen/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./component/Screen/ProductScreen/ProductScreen";
import NotFound from "./component/Screen/NotFound";
import RegisterScreen from "./component/Screen/RegisterScreen";
import LoginScreen from "./component/Screen/LoginScreen";
import CartScreen from "./component/Screen/CartScreen";


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
