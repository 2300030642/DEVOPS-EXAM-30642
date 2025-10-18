import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/productapi`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      if (res.data.products) {
        setProducts(res.data.products);
        setMessage("");
      } else {
        setProducts([]);
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Error fetching products:"+err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await axios.delete(`${API_URL}/delete/${id}`);
        alert(res.data);
        loadProducts();
      } catch (err) {
        alert("Error deleting product:"+err.message);
      }
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price}</td>
                <td>
                  <Link to={`/view/${p.id}`} className="btn btn-info btn-sm me-2">View</Link>
                  <Link to={`/edit/${p.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                  <button onClick={() => deleteProduct(p.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                {message || "No products found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
