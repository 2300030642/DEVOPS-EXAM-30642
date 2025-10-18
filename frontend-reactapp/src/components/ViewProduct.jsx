import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './style.css'


const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/productapi`;

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

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
      }
    } catch (err) {
      setMessage("Error fetching product details:"+err.message);
    }
  };

  return (
    <div>
      <h2>View Product</h2>
      {message && <p className="text-danger">{message}</p>}
      {product && (
        <div className="card p-4 mt-3 shadow">
          <h5>ID: {product.id}</h5>
          <h5>Name: {product.name}</h5>
          <h5>Description: {product.description}</h5>
          <h5>Price: ${product.price}</h5>
          <Link to="/" className="btn btn-secondary mt-3">Back</Link>
        </div>
      )}
    </div>
  );
}

export default ViewProduct;
