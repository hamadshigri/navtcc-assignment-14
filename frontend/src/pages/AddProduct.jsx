import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products", form);
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-96 space-y-3"
      >
        <h2 className="text-xl font-bold">Add Product</h2>

        <input
          className="w-full p-2 border rounded"
          placeholder="Product Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Image URL"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Price"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Add Product
        </button>
      </form>

    </div>
  );
}