'use client';

import { useState } from 'react';
import { products as initialProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { Trash2, Pencil, Plus, X, Check } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: string | number;
    image: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts);

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
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, name, category, price, image } : p));
        } else {
            // Add
            setProducts([{ id: products.length + 1, name, category, price, image }, ...products]);
        }
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this product?')) return;
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                    <Plus size={16} /> Add Product
                </button>
            </div>

            {/* Products Table */}
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
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="h-16 w-16 object-cover rounded shadow-sm border"
                                    />
                                </td>
                                <td className="p-3 text-gray-700 font-medium">{p.name}</td>
                                <td className="p-3 text-gray-500">{p.category}</td>
                                <td className="p-3 text-gray-700 font-semibold">₹{p.price}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => openEditModal(p)}
                                        className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="p-1 rounded hover:bg-red-100 text-red-600 transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
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
                <div className="fixed inset-0 bg-transparent bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                        <button onClick={() => setModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                        <div className="flex flex-col gap-3">
                            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
                            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded">
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" />
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            {image && <img src={image} alt="Preview" className="h-24 mt-2 rounded shadow" />}
                            <button onClick={handleSave} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mt-2">
                                <Check size={16} /> {editingProduct ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
