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
  const [form, setForm] = useState({
    name: "",
    location: "",
    message: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.success) setTestimonials(data.testimonials);
      else toast.error(data.error || "Failed to fetch testimonials");
    } catch {
      toast.error("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Upload image to Supabase Storage
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");
      return data.path; // return public URL path
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
      return "";
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.location || !form.message)
      return toast.error("Fill all fields");

    setLoading(true);

    let image_url = "";
    if (form.image) image_url = await uploadImage(form.image);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image_url }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Testimonial added!");
        setForm({ name: "", location: "", message: "", image: null });
        fetchTestimonials();
      } else toast.error(data.error);
    } catch (err) {
      toast.error("Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Deleted successfully!");
        fetchTestimonials();
      } else toast.error(data.error);
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div className="p-10">
      <Toaster position="top-right" />
      <h1 className="text-2xl mb-6">Manage Testimonials</h1>

      {/* FORM */}
      <div className="space-y-3 mb-10">
        <input
          placeholder="Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="border p-2 w-full"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-2 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Testimonial"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="border p-4 flex justify-between items-start">
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
              <p>{t.message}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {t.image_url && (
                <Image
                  src={t.image_url}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
              )}
              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
