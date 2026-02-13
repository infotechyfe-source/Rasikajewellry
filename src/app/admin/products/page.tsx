'use client';

import { useState, useEffect } from 'react';
import { categories } from '@/data/categories';
import { Trash2, Pencil, Plus, X, Check } from 'lucide-react';
import Image from 'next/image';
import AdminAuth from '@/components/Admin/AdminAuth';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    category: string;
    price: string | number;
    image: string;
    active: boolean;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);

    // Fetch products from API
    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/products?page=${page}`);
            const data = await res.json();

            if (data.success) {
                setProducts(data.products);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(page);
            }
        } catch (err) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProducts(1);
    }, []);


    // Open add modal
    const openAddModal = () => {
        setEditingProduct(null);
        setName('');
        setCategory('');
        setPrice('');
        setImage(null);
        setModalOpen(true);
    };

    // Open edit modal
    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price.toString());
        setImage(product.image);
        setModalOpen(true);
    };

    // Upload image
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) setImage(data.path);
            else toast.error('Image upload failed');
        } catch (err) {
            console.error('Failed to upload image:', err);
            toast.error('Image upload failed');
        }
    };

    // Save product (add or edit)
    const handleSave = async () => {
        if (!name || !category || !price || !image)
            return toast.error('Please fill all fields');

        setSaveLoading(true);

        try {
            if (editingProduct) {
                const res = await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        category,
                        price: Number(price),
                        image,
                        active: editingProduct.active
                    }),
                });

                const data = await res.json();

                if (data.success) {
                    toast.success('Product updated successfully!');
                    fetchProducts(currentPage);
                } else {
                    toast.error(data.error);
                }
            } else {
                const res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        category,
                        price: Number(price),
                        image,
                        active: true
                    }),
                });

                const data = await res.json();

                if (data.success) {
                    toast.success('Product added successfully!');
                    fetchProducts(1);
                } else {
                    toast.error(data.error);
                }
            }

            setModalOpen(false);
        } catch {
            toast.error('Failed to save product');
        } finally {
            setSaveLoading(false);
        }
    };

    // Delete product
    const handleDelete = async (productId: string) => {
        if (!confirm("Delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
            const data = await res.json();

            if (data.success) {
                setProducts(prev => prev.filter(p => p.id !== productId));
                toast.success('Product deleted successfully!');
            } else {
                toast.error(data.error);
            }
        } catch {
            toast.error('An error occurred while deleting the product.');
        }
    };

    // Toggle active/inactive
    const toggleProduct = async (product: Product) => {
        setActionLoadingId(product.id);

        try {
            const res = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: !product.active }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`Product ${!product.active ? 'Activated' : 'Deactivated'}`);
                fetchProducts(currentPage);
            } else {
                toast.error(data.error);
            }
        } catch {
            toast.error('Status update failed');
        } finally {
            setActionLoadingId(null);
        }
    };

    if (loading) return <p className="p-6 text-gray-500">Loading products...</p>;

    return (
        <AdminAuth>
            <Toaster position="top-right" />
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 bg-[#8B4513] text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
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
                                <tr key={p.id} className={`transition hover:bg-gray-50 ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                    <td className="p-3 text-gray-700">{p.id}</td>
                                    <td className="p-3">
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            width={64}
                                            height={64}
                                            className="object-cover rounded shadow-sm border"
                                            unoptimized
                                        />
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
                                            disabled={actionLoadingId === p.id}
                                            onClick={() => handleDelete(p.id)}
                                            className="p-1 rounded hover:bg-red-100 text-red-600 transition disabled:opacity-50"
                                        >
                                            {actionLoadingId === p.id ? '...' : <Trash2 size={18} />}
                                        </button>

                                        <button
                                            disabled={actionLoadingId === p.id}
                                            onClick={() => toggleProduct(p)}
                                            className={`px-3 py-1 rounded text-xs font-medium text-white transition 
    ${p.active ? 'bg-green-500' : 'bg-red-500'}
    disabled:opacity-50`}
                                        >
                                            {actionLoadingId === p.id ? 'Updating...' : p.active ? 'Active' : 'Inactive'}
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

                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => fetchProducts(currentPage - 1)}
                            className="px-4 py-2 border border-[#8B4513] rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => fetchProducts(currentPage + 1)}
                            className="px-4 py-2 border border-[#8B4513] rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                        <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto relative p-6">
                            <button
                                title="close"
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-semibold mb-1">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">Manage your jewellery inventory</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Eg. Oxidised Ring"
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        placeholder="Eg. 199"
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Product Image</label>
                                    <label className="flex items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-black transition">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        <span className="text-sm text-gray-500">Click to upload image</span>
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

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={saveLoading}
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white disabled:opacity-50"
                                    >
                                        {saveLoading ? 'Saving...' : (
                                            <>
                                                <Check size={16} />
                                                {editingProduct ? 'Save Changes' : 'Add Product'}
                                            </>
                                        )}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminAuth>
    );
}


