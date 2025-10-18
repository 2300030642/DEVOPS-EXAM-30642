import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './style.css'


const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/productapi`;

function EditProduct() {
  const [product, setProduct] = useState({ name: "", description: "", price: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/get/${id}`);
      if (typeof res.data === "string") {
        setMessage(res.data);
      } else {
        setProduct(res.data);
        setMessage("");
      }
    } catch (err) {
      setMessage("Error loading product:"+err.message);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/update/${id}`, product);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert("Error updating product:"+err.message);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {message && <p className="text-danger">{message}</p>}
      {!message && (
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
          <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
      )}
    </div>
  );
}

export default EditProduct;
