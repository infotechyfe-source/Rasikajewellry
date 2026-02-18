"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface HeroVideo {
  id: string;
  video_url: string;
}

export default function AdminHero() {
  const [videos, setVideos] = useState<HeroVideo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("hero_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const uploadVideo = async (file: File) => {
    const fileName = `hero-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("hero")
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error("Upload failed");
      return null;
    }

    const { data } = supabase.storage
      .from("hero")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const url = await uploadVideo(file);
    if (!url) {
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("hero_videos")
      .insert([{ video_url: url }]);

    if (error) toast.error("Database insert failed");
    else toast.success("Hero video added!");

    setLoading(false);
    fetchVideos();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("hero_videos").delete().eq("id", id);
    toast.success("Deleted");
    fetchVideos();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Manage Hero Videos</h1>

      <input type="file" accept="video/mp4" onChange={handleUpload} />

      {loading && <p>Uploading...</p>}

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {videos.map((v) => (
          <div key={v.id} className="border p-4 rounded">
            <video src={v.video_url} controls className="w-full rounded" />
            <button
              onClick={() => handleDelete(v.id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
