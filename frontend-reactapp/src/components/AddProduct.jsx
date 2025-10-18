import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/productapi`;

function AddProduct() {
  const [product, setProduct] = useState({ name: "", description: "", price: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/add`, product);
      alert(res.data);
      navigate("/");
    } catch (err) 
    {
      alert("Error adding product:"+err.message);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;