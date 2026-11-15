"use client";
import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const configured = isSupabaseConfigured();

  const signIn = async () => {
    if (!configured) { setMsg("Demo mode: Supabase keys .env.local me dalo"); return; }
    const supabase = createClient()!;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMsg(error ? error.message : "✅ Login ho gaya! Ab /create pe post dalo.");
  };

  const signUp = async () => {
    if (!configured) { setMsg("Demo mode: Supabase keys .env.local me dalo"); return; }
    const supabase = createClient()!;
    const { error } = await supabase.auth.signUp({ email, password });
    setMsg(error ? error.message : "✅ Account ban gaya! Email confirm karo, fir login karo.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center">WSTA</h1>
        <p className="text-center text-sm text-gray-500 mt-1">Login karo, post dalo 🚀</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg p-3 mt-5 text-sm" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded-lg p-3 mt-3 text-sm" />
        <button onClick={signIn} className="w-full bg-brand text-white font-semibold py-3 rounded-lg mt-4">Log In</button>
        <button onClick={signUp} className="w-full border font-semibold py-3 rounded-lg mt-2">Sign Up</button>
        {msg && <p className="text-sm mt-3 text-center text-gray-600">{msg}</p>}
        {!configured && <p className="text-xs mt-3 text-center text-yellow-600">Demo mode — Supabase keys nahi mile</p>}
      </div>
    </main>
  );
}
