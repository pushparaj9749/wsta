"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  const ensureProfile = async () => {
    const supabase = createClient()!;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: prof } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (!prof) {
      const uname = (user.email?.split("@")[0] || "user") + "-" + user.id.slice(0, 4);
      await supabase.from("profiles").insert({ id: user.id, username: uname });
    }
  };

  const signIn = async () => {
    if (!configured) { setMsg("Demo mode: Supabase keys nahi mile"); return; }
    setBusy(true);
    const supabase = createClient()!;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMsg(error.message); setBusy(false); return; }
    await ensureProfile();
    setMsg("✅ Login ho gaya! Ab post dalo.");
    setTimeout(() => router.push("/create"), 600);
  };

  const signUp = async () => {
    if (!configured) { setMsg("Demo mode: Supabase keys nahi mile"); return; }
    setBusy(true);
    const supabase = createClient()!;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setMsg(error.message); setBusy(false); return; }
    if (data.session) {
      await ensureProfile();
      setMsg("✅ Account ban gaya! Ab post dalo.");
      setTimeout(() => router.push("/create"), 600);
    } else {
      setMsg("Account ban gaya! Email confirm karo, fir login karo.");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center">WSTA</h1>
        <p className="text-center text-sm text-gray-500 mt-1">Login karo, post dalo 🚀</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg p-3 mt-5 text-sm" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded-lg p-3 mt-3 text-sm" />
        <button onClick={signIn} disabled={busy} className="w-full bg-brand text-white font-semibold py-3 rounded-lg mt-4 disabled:opacity-50">Log In</button>
        <button onClick={signUp} disabled={busy} className="w-full border font-semibold py-3 rounded-lg mt-2 disabled:opacity-50">Sign Up</button>
        {msg && <p className="text-sm mt-3 text-center text-gray-600">{msg}</p>}
        {!configured && <p className="text-xs mt-3 text-center text-yellow-600">Demo mode — Supabase keys nahi mile</p>}
      </div>
    </main>
  );
}
