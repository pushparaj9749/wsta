export type Post = {
  id: string;
  user: { username: string; avatar: string };
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: { user: string; text: string }[];
  time: string;
};

export type Story = { id: string; user: string; avatar: string; seen: boolean };
