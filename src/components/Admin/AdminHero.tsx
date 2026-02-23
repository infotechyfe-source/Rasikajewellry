"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface HeroVideo {
  id: string;
  video_url: string;
  position?: number;
}

const MAX_VIDEOS = 10;

export default function AdminHero() {
  const [videos, setVideos] = useState<HeroVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  /* ---------------- FETCH ---------------- */
  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("hero_videos")
      .select("*")
      .order("position", { ascending: true });

    if (!error && data) {
      setVideos(data);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ---------------- UPLOAD ---------------- */
  const uploadToStorage = async (file: File) => {
    const fileName = `hero-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("hero")
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error("Upload failed");
      return null;
    }

    const { data } = supabase.storage.from("hero").getPublicUrl(fileName);
    return { url: data.publicUrl, path: fileName };
  };

  const handleFileSelect = (file: File) => {
    if (videos.length >= MAX_VIDEOS) {
      toast.error("Maximum 10 hero videos allowed");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video must be under 50MB");
      return;
    }

    setUploadFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    setLoading(true);

    const result = await uploadToStorage(uploadFile);
    if (!result) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("hero_videos").insert([
      {
        video_url: result.url,
        position: videos.length + 1,
      },
    ]);

    if (error) toast.error("Database insert failed");
    else toast.success("Hero video added!");

    setUploadFile(null);
    setPreviewUrl(null);
    setLoading(false);
    fetchVideos();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (video: HeroVideo) => {
    setLoading(true);

    // Extract file path from URL
    const path = video.video_url.split("/hero/")[1];

    await supabase.storage.from("hero").remove([path]);
    await supabase.from("hero_videos").delete().eq("id", video.id);

    toast.success("Deleted successfully");

    setLoading(false);
    fetchVideos();
  };

  /* ---------------- REORDER ---------------- */
  const moveVideo = async (index: number, direction: "up" | "down") => {
    const newVideos = [...videos];

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newVideos.length) return;

    [newVideos[index], newVideos[swapIndex]] = [
      newVideos[swapIndex],
      newVideos[index],
    ];

    // Update positions in DB
    for (let i = 0; i < newVideos.length; i++) {
      await supabase
        .from("hero_videos")
        .update({ position: i + 1 })
        .eq("id", newVideos[i].id);
    }

    setVideos(newVideos);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Manage Hero Videos</h1>
      <p className="text-gray-500 mb-6">
        {videos.length} / {MAX_VIDEOS} videos added
      </p>

      {/* ---------------- UPLOAD AREA ---------------- */}
      <div
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFileSelect(file);
        }}
      >
        <p className="text-gray-600">
          Drag & drop video here or click below
        </p>

        <input
          type="file"
          accept="video/mp4"
          className="mt-4"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          disabled={videos.length >= MAX_VIDEOS}
        />
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-6 border rounded-lg p-4">
          <p className="mb-2 font-medium">Preview</p>
          <video
            src={previewUrl}
            controls
            className="w-full max-h-80 rounded"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-black text-white rounded"
          >
            {loading ? "Uploading..." : "Confirm Upload"}
          </button>
        </div>
      )}

      {/* ---------------- VIDEO GRID ---------------- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <video
              src={video.video_url}
              controls
              className="w-full h-64 object-cover"
            />

            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Position: {index + 1}</span>
                <button
                  onClick={() => handleDelete(video)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => moveVideo(index, "up")}
                  disabled={index === 0}
                  className="flex-1 border py-1 rounded"
                >
                  ↑ Move Up
                </button>
                <button
                  onClick={() => moveVideo(index, "down")}
                  disabled={index === videos.length - 1}
                  className="flex-1 border py-1 rounded"
                >
                  ↓ Move Down
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}