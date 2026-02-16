"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    message: "",
    image: null as File | null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    setTestimonials(data || []);
  };

  const handleSubmit = async () => {
    let imageUrl = "";

    if (form.image) {
      const fileName = `${Date.now()}-${form.image.name}`;

      const { data } = await supabase.storage
        .from("testimonials")
        .upload(fileName, form.image);

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/testimonials/${fileName}`;
    }

    await supabase.from("testimonials").insert([
      {
        name: form.name,
        location: form.location,
        message: form.message,
        image_url: imageUrl,
      },
    ]);

    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Manage Testimonials</h1>

      {/* FORM */}
      <div className="space-y-3 mb-10">
        <input
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Location"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2"
        >
          Add Testimonial
        </button>
      </div>

      {/* LIST */}
      {testimonials.map((t: any) => (
        <div key={t.id} className="border p-4 mb-4">
          <p className="font-bold">{t.name}</p>
          <p>{t.message}</p>
          <button
            onClick={() => deleteTestimonial(t.id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
