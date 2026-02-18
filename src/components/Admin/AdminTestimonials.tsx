"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface Testimonial {
    id: string;
    name: string;
    location: string;
    message: string;
    image_url?: string;
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [form, setForm] = useState({
        name: "",
        location: "",
        message: "",
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    /* ---------------- FETCH TESTIMONIALS ---------------- */
    const fetchTestimonials = async () => {
        try {
            setFetching(true);
            const res = await fetch("/api/testimonials");
            const data = await res.json();

            if (data.success) {
                setTestimonials(data.testimonials);
            } else {
                toast.error(data.error || "Failed to fetch testimonials");
            }
        } catch {
            toast.error("Failed to fetch testimonials");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    /* ---------------- IMAGE UPLOAD ---------------- */
    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!data.success) {
            toast.error("Image upload failed");
            return "";
        }

        return data.publicUrl;
    };


    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {
        if (!form.name || !form.location || !form.message) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);

        let image_url = "";
        if (form.image) {
            image_url = await uploadImage(form.image);
            if (!image_url) {
                setLoading(false);
                return;
            }
        }

        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    location: form.location,
                    message: form.message,
                    image_url,
                }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Testimonial added!");
                setForm({ name: "", location: "", message: "", image: null });
                setPreview(null);
                fetchTestimonials();
            } else {
                toast.error(data.error);
            }
        } catch {
            toast.error("Failed to add testimonial");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- DELETE ---------------- */
    const handleDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials?id=${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Deleted successfully!");
                fetchTestimonials();
            } else {
                toast.error(data.error);
            }
        } catch {
            toast.error("Failed to delete testimonial");
        }
    };

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <Toaster position="top-right" />

            <h1 className="text-3xl font-bold mb-8">Manage Testimonials</h1>

            {/* ---------------- FORM CARD ---------------- */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10">
                <h2 className="text-xl font-semibold mb-4">Add New Testimonial</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        placeholder="Name"
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        placeholder="Location"
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                </div>

                <textarea
                    placeholder="Message"
                    rows={4}
                    className="border rounded-lg p-3 w-full mt-4 focus:ring-2 focus:ring-black outline-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <div className="mt-4 flex items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setForm({ ...form, image: file });

                            if (file) {
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />

                    {preview && (
                        <Image
                            src={preview}
                            alt="Preview"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                        />
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Add Testimonial"}
                </button>
            </div>

            {/* ---------------- LIST ---------------- */}
            <div>
                <h2 className="text-xl font-semibold mb-4">All Testimonials</h2>

                {fetching ? (
                    <p className="text-gray-500">Loading testimonials...</p>
                ) : testimonials.length === 0 ? (
                    <p className="text-gray-500">No testimonials yet.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-bold text-lg">{t.name}</p>
                                        <p className="text-sm text-gray-500">{t.location}</p>
                                    </div>

                                    {t.image_url && (
                                        <Image
                                            src={t.image_url}
                                            alt={t.name}
                                            width={70}
                                            height={70}
                                            className="rounded-lg object-cover"
                                        />
                                    )}
                                </div>

                                <p className="mt-4 text-gray-700">{t.message}</p>

                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="mt-4 text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
