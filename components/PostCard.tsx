"use client";
import { useState } from "react";
import type { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const addComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, { user: "you", text: comment }]);
    setComment("");
  };

  return (
    <article className="border-b border-gray-200 py-4">
      <div className="flex items-center gap-3 px-1 pb-3">
        <img src={post.user.avatar} alt={post.user.username} className="h-9 w-9 rounded-full object-cover" />
        <span className="font-semibold text-sm">{post.user.username}</span>
        <span className="text-gray-500 text-sm">• {post.time}</span>
      </div>
      <img src={post.image} alt="post" className="w-full aspect-square object-cover rounded-md border border-gray-100" />
      <div className="flex items-center gap-4 px-1 pt-3 text-2xl">
        <button onClick={toggleLike} aria-label="like" className={liked ? "text-red-500" : ""}>
          {liked ? "❤️" : "🤍"}
        </button>
        <button aria-label="comment">💬</button>
        <button aria-label="share">✈️</button>
        <span className="ml-auto text-xl">🔖</span>
      </div>
      <p className="px-1 pt-2 font-semibold text-sm">{likes.toLocaleString("en-IN")} likes</p>
      <p className="px-1 text-sm"><span className="font-semibold">{post.user.username}</span> {post.caption}</p>
      <div className="px-1 pt-1 space-y-1">
        {comments.map((c, i) => (
          <p key={i} className="text-sm text-gray-700"><span className="font-semibold text-black">{c.user}</span> {c.text}</p>
        ))}
      </div>
      <div className="flex gap-2 px-1 pt-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
          placeholder="Add a comment..."
          className="flex-1 text-sm outline-none placeholder:text-gray-400"
        />
        {comment && <button onClick={addComment} className="text-sm font-semibold text-blue-500">Post</button>}
      </div>
    </article>
  );
}
