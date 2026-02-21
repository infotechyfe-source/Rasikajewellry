'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Trash2,
  Pencil,
  Plus,
  X,
  Check,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { categories, categoriesWithTypes } from '@/data/categories';

interface Product {
  id: string;
  name: string;
  category: string;
  type?: string;
  price: number;
  image: string;
  active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    type: '',
    price: '',
    image: '',
  });

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else toast.error(data.error);
    } catch {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FILTER + SEARCH + SORT =================
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    if (sortBy === 'price-low')
      filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high')
      filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'name')
      filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [products, search, filterCategory, sortBy]);

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'products');

    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.path }));
        toast.success('Image uploaded');
      } else toast.error(data.error);
    } catch {
      toast.error('Upload failed');
    }
  };

  // ================= SAVE PRODUCT =================
  const handleSave = async () => {
    if (!form.name || !form.category || !form.price || !form.image)
      return toast.error('Please fill all fields');

    setSaveLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      active: editingProduct?.active ?? true,
    };

    try {
      const res = await fetch(
        editingProduct
          ? `/api/products/${editingProduct.id}`
          : '/api/products',
        {
          method: editingProduct ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success(
          editingProduct
            ? 'Product updated'
            : 'Product added'
        );
        setModalOpen(false);
        fetchProducts();
      } else toast.error(data.error);
    } catch {
      toast.error('Save failed');
    } finally {
      setSaveLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      } else toast.error(data.error);
    } catch {
      toast.error('Delete failed');
    }
  };

  // ================= TOGGLE =================
  const toggleStatus = async (product: Product) => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !product.active }),
      });
      fetchProducts();
    } catch {
      toast.error('Status update failed');
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      category: '',
      type: '',
      price: '',
      image: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      type: product.type || '',
      price: product.price.toString(),
      image: product.image,
    });
    setModalOpen(true);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading products...
      </div>
    );

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-8 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Product Management
            </h1>
            <p className="text-gray-500">
              Manage your jewellery inventory professionally
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl shadow hover:opacity-90 cursor-pointer"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-80">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search product..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value)
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="latest">Latest</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                    <div>
                      <p className="font-medium">
                        {p.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {p.type}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">{p.category}</td>

                  <td className="p-4 font-semibold">
                    ₹{p.price}
                  </td>

                  <td className="p-4">
                    <span
                      onClick={() => toggleStatus(p)}
                      className={`px-3 py-1 text-xs rounded-full cursor-pointer ${p.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="p-4 text-right flex justify-end gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-blue-600 hover:scale-110 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(p.id)
                      }
                      className="text-red-600 hover:scale-110 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative overflow-hidden">

            {/* HEADER */}
            <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <p className="text-sm text-gray-500">
                  Manage product information and inventory details
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="grid md:grid-cols-2 gap-10 p-8">

              {/* LEFT SIDE - IMAGE */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Product Image
                </label>

                <label className="border-2 border-dashed border-gray-300 rounded-2xl h-72 flex items-center justify-center cursor-pointer hover:border-black transition bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {!form.image ? (
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">
                        Click to upload product image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 1MB
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={form.image}
                      alt="Preview"
                      width={300}
                      height={300}
                      className="object-cover rounded-2xl h-full"
                      unoptimized
                    />
                  )}
                </label>
              </div>

              {/* RIGHT SIDE - DETAILS */}
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Eg. Gold Plated Necklace"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        category: e.target.value,
                        type: "", // reset type when category changes
                      });
                    }}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Type (Optional)
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
                    disabled={!form.category}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  >
                    <option value="">
                      {form.category ? "Select Type" : "Select Category First"}
                    </option>

                    {form.category &&
                      categoriesWithTypes[form.category]?.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="Eg. 1999"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-4 px-8 py-6 border-t bg-gray-50">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 rounded-xl border text-gray-600 hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                disabled={saveLoading}
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {saveLoading
                  ? 'Saving...'
                  : editingProduct
                    ? 'Update Product'
                    : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}