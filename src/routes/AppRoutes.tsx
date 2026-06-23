import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "../pages/ProductDetails";
import ProductListing from "../pages/ProductListing";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}