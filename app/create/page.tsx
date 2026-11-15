"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { compressImage, formatBytes } from "@/lib/compress";
import { uploadPostImage } from "@/lib/storage";

export default function Create() {
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus(`Original: ${formatBytes(f.size)} — upload pe compress hoga`);
  };

  const onPost = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const before = file.size;
      const url = await uploadPostImage(file, "demo-user");
      const after = (await compressImage(file)).size;
      setStatus(`✅ Post ready! ${formatBytes(before)} → ${formatBytes(after)} (${Math.round((1 - after / before) * 100)}% kam) • ${url.slice(0, 40)}...`);
    } catch (err) {
      setStatus("❌ Error: " + String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10 max-w-lg mx-auto w-full">
        <h1 className="text-xl font-bold py-4">Create Post</h1>
        <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50">
          <input type="file" accept="image/*" className="hidden" onChange={onPick} />
          {preview ? <img src={preview} alt="preview" className="w-full aspect-square object-cover rounded-lg" /> : <p className="text-gray-500">📸 Photo select karo<br /><span className="text-xs">Upload se pehle auto-compress hoga</span></p>}
        </label>
        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption likho..." className="w-full border rounded-lg p-3 mt-4 text-sm" rows={3} />
        <button onClick={onPost} disabled={!file || busy} className="w-full bg-brand text-white font-semibold py-3 rounded-lg mt-3 disabled:opacity-50">
          {busy ? "Uploading..." : "Share Post"}
        </button>
        {status && <p className="text-sm mt-3 text-gray-600">{status}</p>}
      </main>
      <BottomNav />
    </div>
  );
}
