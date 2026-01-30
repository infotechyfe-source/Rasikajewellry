'use client';

import { useState } from 'react';
import { products as initialProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { Trash2, Pencil, Plus, X, Check } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    category: string;
    price: string | number;
    image: string;
    active: boolean;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(
        initialProducts.map(p => ({ ...p, active: true }))
    );

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);

    // Open Add Product modal
    const openAddModal = () => {
        setEditingProduct(null);
        setName(''); setCategory(''); setPrice(''); setImage(null);
        setModalOpen(true);
    };

    // Open Edit Product modal
    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price.toString());
        setImage(product.image);
        setModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (!name || !category || !price || !image) return alert('Please fill all fields');
        if (editingProduct) {
            // Edit
            setProducts(prev => {
                const updated = prev.map(p =>
                    p.id === editingProduct.id
                        ? { ...p, name, category, price, image }
                        : p
                );

                localStorage.setItem("products", JSON.stringify(updated));
                return updated;
            });
        } else {

            // Add
            setProducts(prev => {
                const updated = [
                    {
                        id: Date.now(), // 🔴 IMPORTANT: avoid duplicate IDs
                        name,
                        category,
                        price,
                        image,
                        active: true, // ✅ VERY IMPORTANT
                    },
                    ...prev,
                ];

                localStorage.setItem("products", JSON.stringify(updated));
                return updated;
            });

        }
        setModalOpen(false);
    };

    const updateProducts = (updatedProducts: Product[]) => {
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };


    const handleDelete = (id: number) => {
        if (!confirm('Delete this product?')) return;
        setProducts(products.filter(p => p.id !== id));
    };

    const toggleProduct = (id: number) => {
        setProducts(prev => {
            const updated = prev.map(p =>
                p.id === id ? { ...p, active: !p.active } : p
            );

            localStorage.setItem("products", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
                    <Plus size={16} /> Add Product
                </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-3 text-left text-gray-600 uppercase text-sm font-medium">ID</th>
                            <th className="p-3 text-left text-gray-600 uppercase text-sm font-medium">Image</th>
                            <th className="p-3 text-left text-gray-600 uppercase text-sm font-medium">Name</th>
                            <th className="p-3 text-left text-gray-600 uppercase text-sm font-medium">Category</th>
                            <th className="p-3 text-left text-gray-600 uppercase text-sm font-medium">Price</th>
                            <th className="p-3 text-left text-gray-600 uppercase text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {products.map((p, i) => (
                            <tr
                                key={p.id}
                                className={`transition hover:bg-gray-50 ${i % 2 === 0 ? 'bg-gray-50' : ''}`}
                            >
                                <td className="p-3 text-gray-700">{p.id}</td>
                                <td className="p-3">
                                    <Image
                                        src={p.image} alt={p.name} width={64} height={64}
                                        className="object-cover rounded shadow-sm border" />
                                </td>
                                <td className="p-3 text-gray-700 font-medium">{p.name}</td>
                                <td className="p-3 text-gray-500">{p.category}</td>
                                <td className="p-3 text-gray-700 font-semibold">₹{p.price}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => openEditModal(p)}
                                        className="p-1 rounded hover:bg-blue-100 text-blue-600 transition cursor-pointer"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="p-1 rounded hover:bg-red-100 text-red-600 transition cursor-pointer"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    {/* Active / Inactive */}
                                    <button
                                        onClick={() => toggleProduct(p.id)}
                                        className={`px-3 py-1 rounded text-xs font-medium text-white cursor-pointer ${p.active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`} >
                                        {p.active ? "Active" : "Inactive"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl
                max-h-[90vh] overflow-y-auto relative p-6">

                        {/* Close button */}
                        <button title='close'
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <h2 className="text-2xl font-semibold mb-1">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Manage your jewellery inventory
                        </p>

                        {/* Form */}
                        <div className="space-y-4">

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Eg. Oxidised Ring"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Category
                                </label>
                                <select title='category'
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Price (₹)
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    placeholder="Eg. 199"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Product Image
                                </label>

                                <label className="flex items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-black transition">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    <span className="text-sm text-gray-500">
                                        Click to upload image
                                    </span>
                                </label>

                                {image && (
                                    <div className="mt-3 flex justify-center">
                                        <Image
                                            src={image}
                                            alt="Preview"
                                            width={112}
                                            height={112}
                                            className="rounded-lg shadow object-cover"
                                            unoptimized
                                        />

                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition cursor-pointer"
                                >
                                    <Check size={16} />
                                    {editingProduct ? 'Save Changes' : 'Add Product'}
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
