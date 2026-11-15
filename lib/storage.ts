// Storage abstraction: Supabase Storage (primary) -> R2 (ready) -> Demo (local)
// Provider badalna pade to sirf yaha change karo, pura app nahi badlega.

import { createClient, isSupabaseConfigured } from "./supabase/client";
import { compressImage } from "./compress";

export async function uploadPostImage(file: File, userId: string): Promise<string> {
  const compressed = await compressImage(file);
  const ext = "webp";
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  if (isSupabaseConfigured()) {
    const supabase = createClient()!;
    const { error } = await supabase.storage.from("posts").upload(path, compressed, {
      contentType: "image/webp",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("posts").getPublicUrl(path);
    return data.publicUrl;
  }

  // Demo mode: local object URL (preview ke liye)
  return URL.createObjectURL(compressed);
}

export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const compressed = await compressImage(file, 320, 0.8);
  const path = `${userId}/avatar-${Date.now()}.webp`;
  if (isSupabaseConfigured()) {
    const supabase = createClient()!;
    const { error } = await supabase.storage.from("avatars").upload(path, compressed, {
      contentType: "image/webp",
      upsert: true,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  }
  return URL.createObjectURL(compressed);
}
