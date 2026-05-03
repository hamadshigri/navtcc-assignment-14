import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

    <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold">Products Dashboard</h2>


    <div className="flex gap-3">

      <button
        onClick={() => navigate("/add-product")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Product
      </button>


      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

</div>

</div>

      <div className="grid md:grid-cols-4 gap-4">
      {products.map((p) => (
    <div key={p._id} className="bg-white rounded shadow overflow-hidden py-4">

      <img
        src={p.image || "https://via.placeholder.com/300"}
        className="w-full h-40 object-contain"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg">{p.name}</h3>

        <p className="text-gray-600 text-sm">{p.description}</p>

        <p className="text-blue-600 font-bold mt-2">
          ${p.price}
        </p>

        <div className="flex justify-between mt-3">
        <button
        onClick={() => navigate(`/edit-product/${p._id}`)}
        className="text-blue-600"
        >
          Edit
        </button>
          <button
          onClick={() => deleteProduct(p._id)}
          className="text-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  ))}
</div>

    </div>
  );
}