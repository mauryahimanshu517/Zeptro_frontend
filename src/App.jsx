import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/Navbar"
import About from "./pages/About"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Footer from "./component/Footer"
import Product from "./pages/Product"
import SingleProduct from "./pages/SingleProduct"
import CatogoriesPage from "./pages/CatogoriesPage"
// import RazorpayPayment from "./component/RazorpayPayment" // ✅ Import here

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catogories/:value" element={<CatogoriesPage />} />
        {/* ✅ Add this new route for payment page */}
        {/* <Route path="/payment" element={<RazorpayPayment />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
