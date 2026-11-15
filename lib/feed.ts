import { createClient, isSupabaseConfigured } from "./supabase/client";
import { demoPosts } from "./demo";
import type { Post } from "./types";

export async function fetchFeed(): Promise<{ posts: Post[]; mode: "real" | "demo" }> {
  if (!isSupabaseConfigured()) return { posts: demoPosts, mode: "demo" };
  const supabase = createClient()!;
  const { data, error } = await supabase
    .from("posts")
    .select("id, image_url, caption, created_at, profiles(username, avatar_url)")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error || !data || data.length === 0) return { posts: demoPosts, mode: "demo" };
  const posts: Post[] = data.map((p: any) => ({
    id: p.id,
    user: { username: p.profiles?.username || "user", avatar: p.profiles?.avatar_url || "https://picsum.photos/seed/u/150/150" },
    image: p.image_url,
    caption: p.caption || "",
    likes: 0,
    liked: false,
    comments: [],
    time: new Date(p.created_at).toLocaleDateString("en-IN"),
  }));
  return { posts, mode: "real" };
}
