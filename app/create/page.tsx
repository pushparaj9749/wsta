"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { compressImage, formatBytes } from "@/lib/compress";
import { uploadPostImage } from "@/lib/storage";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function Create() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) { setChecking(false); return; }
    const supabase = createClient()!;
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
      setChecking(false);
    });
  }, []);

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
      let url: string;
      let after = before;

      if (isSupabaseConfigured()) {
        const supabase = createClient()!;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setStatus("❌ Pehle Login karo — /login pe jao, Sign Up / Log In karo, fir post dalo.");
          setBusy(false);
          return;
        }
        // Profile ensure karo (trigger miss ho gaya ho to)
        const { data: prof } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
        if (!prof) {
          const uname = (user.email?.split("@")[0] || "user") + "-" + user.id.slice(0, 4);
          const { error: perr } = await supabase.from("profiles").insert({ id: user.id, username: uname });
          if (perr) throw perr;
        }
        url = await uploadPostImage(file, user.id);
        after = (await compressImage(file)).size;
        const { error: ierr } = await supabase.from("posts").insert({
          user_id: user.id,
          image_url: url,
          caption: caption || "",
        });
        if (ierr) throw ierr;
        setStatus(`✅ Post live ho gaya! ${formatBytes(before)} → ${formatBytes(after)} (${Math.round((1 - after / before) * 100)}% kam)`);
        setTimeout(() => router.push("/"), 1200);
      } else {
        url = await uploadPostImage(file, "demo-user");
        after = (await compressImage(file)).size;
        setStatus(`✅ Demo post ready! ${formatBytes(before)} → ${formatBytes(after)} (${Math.round((1 - after / before) * 100)}% kam)`);
      }
    } catch (err: any) {
      setStatus("❌ Error: " + (err?.message || String(err)));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10 max-w-lg mx-auto w-full">
        <h1 className="text-xl font-bold py-4">Create Post</h1>
        {checking ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : isSupabaseConfigured() && !userId ? (
          <div className="border rounded-xl p-6 text-center">
            <p className="font-semibold">Pehle login karo 🔐</p>
            <p className="text-sm text-gray-500 mt-1">Post dalne ke liye account chahiye. Sign Up 10 second me ho jayega.</p>
            <a href="/login" className="inline-block mt-4 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium">Login / Sign Up</a>
          </div>
        ) : (
          <>
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50">
              <input type="file" accept="image/*" className="hidden" onChange={onPick} />
              {preview ? <img src={preview} alt="preview" className="w-full aspect-square object-cover rounded-lg" /> : <p className="text-gray-500">📸 Photo select karo<br /><span className="text-xs">Upload se pehle auto-compress hoga</span></p>}
            </label>
            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption likho..." className="w-full border rounded-lg p-3 mt-4 text-sm" rows={3} />
            <button onClick={onPost} disabled={!file || busy} className="w-full bg-brand text-white font-semibold py-3 rounded-lg mt-3 disabled:opacity-50">
              {busy ? "Uploading..." : "Share Post"}
            </button>
            {status && <p className="text-sm mt-3 text-gray-600">{status}</p>}
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
