import type { Post, Story } from "./types";

export const demoStories: Story[] = [
  { id: "1", user: "rahul", avatar: "https://picsum.photos/seed/r1/150/150", seen: false },
  { id: "2", user: "priya", avatar: "https://picsum.photos/seed/p1/150/150", seen: false },
  { id: "3", user: "amit", avatar: "https://picsum.photos/seed/a1/150/150", seen: true },
  { id: "4", user: "sneha", avatar: "https://picsum.photos/seed/s1/150/150", seen: false },
  { id: "5", user: "vikash", avatar: "https://picsum.photos/seed/v1/150/150", seen: false },
  { id: "6", user: "anita", avatar: "https://picsum.photos/seed/an1/150/150", seen: true },
];

export const demoPosts: Post[] = [
  {
    id: "p1",
    user: { username: "rahul", avatar: "https://picsum.photos/seed/r1/150/150" },
    image: "https://picsum.photos/seed/wsta1/800/800",
    caption: "Durgapur ki shaam 🌆 #wsta",
    likes: 1243,
    liked: false,
    comments: [
      { user: "priya", text: "Bhai mast hai! 🔥" },
      { user: "amit", text: "Kahan se liya ye shot?" },
    ],
    time: "2h",
  },
  {
    id: "p2",
    user: { username: "priya", avatar: "https://picsum.photos/seed/p1/150/150" },
    image: "https://picsum.photos/seed/wsta2/800/800",
    caption: "New post ✨ Compress + Cloud = ₹0 kharcha",
    likes: 892,
    liked: true,
    comments: [{ user: "rahul", text: "Storage ka jugaad best hai" }],
    time: "5h",
  },
  {
    id: "p3",
    user: { username: "sneha", avatar: "https://picsum.photos/seed/s1/150/150" },
    image: "https://picsum.photos/seed/wsta3/800/800",
    caption: "200 budget me Insta clone? Ho jayega bro 💪",
    likes: 2105,
    liked: false,
    comments: [
      { user: "vikash", text: "Bana do bhai" },
      { user: "anita", text: "Waiting for launch 🚀" },
    ],
    time: "8h",
  },
];
