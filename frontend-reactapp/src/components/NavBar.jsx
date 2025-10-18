import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";
import "./navbar.css";

function NavBar() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar-custom">
        <Link className="navbar-brand" to="/">Product API</Link>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/add">Add Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">View Products</Link>
          </li>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/view/:id" element={<ViewProduct />} />
      </Routes>
    </div>
  );
}

export default NavBar;
