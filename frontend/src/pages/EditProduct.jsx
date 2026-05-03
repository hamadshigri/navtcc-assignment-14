import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🔹 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setForm({
          name: data.name || "",
          image: data.image || "",
          price: data.price || "",
          description: data.description || "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await API.put(`/products/${id}`, form);
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleUpdate}
        className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          ✏️ Edit Product
        </h2>

        {/* Product Name */}
        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
          placeholder="Product Name"
        />

        {/* Image URL */}
        <input
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
          placeholder="Image URL"
        />

        {/* Image Preview */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        {/* Price */}
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
          placeholder="Price"
        />

        {/* Description */}
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
          placeholder="Description"
        />

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="w-full bg-gray-300 p-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}