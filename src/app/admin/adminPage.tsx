"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category: string;
  metal: string;
  price: number;
  image: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchProducts();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th>Category</th>
            <th>Metal</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td>{p.category}</td>
              <td>{p.metal}</td>
              <td>₹{p.price}</td>
              <td>
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="flex gap-2">
                <button className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
