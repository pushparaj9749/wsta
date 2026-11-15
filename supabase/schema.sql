-- WSTA Supabase Schema (free tier)
-- Supabase Dashboard -> SQL Editor me paste karke Run karo

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  bio text default '',
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  image_url text not null,
  thumbnail_url text,
  caption text default '',
  created_at timestamptz default now()
);

create table if not exists likes (
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz default now()
);

create table if not exists follows (
  follower_id uuid not null references profiles(id) on delete cascade,
  following_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  image_url text not null,
  expires_at timestamptz not null default (now() + interval '24 hours'),
  created_at timestamptz default now()
);

-- Storage buckets (Dashboard -> Storage me bhi bana sakte ho)
insert into storage.buckets (id, name, public) values ('posts', 'posts', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('stories', 'stories', true) on conflict (id) do nothing;

-- RLS: sab public read, sirf owner write (MVP ke liye simple)
alter table profiles enable row level security;
alter table posts enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;
alter table follows enable row level security;
alter table stories enable row level security;

create policy "public read profiles" on profiles for select using (true);
create policy "public read posts" on posts for select using (true);
create policy "public read likes" on likes for select using (true);
create policy "public read comments" on comments for select using (true);
create policy "public read follows" on follows for select using (true);
create policy "public read stories" on stories for select using (true);

create policy "users insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "users update own profile" on profiles for update using (auth.uid() = id);
create policy "users insert own post" on posts for insert with check (auth.uid() = user_id);
create policy "users delete own post" on posts for delete using (auth.uid() = user_id);
create policy "users insert like" on likes for insert with check (auth.uid() = user_id);
create policy "users delete own like" on likes for delete using (auth.uid() = user_id);
create policy "users insert comment" on comments for insert with check (auth.uid() = user_id);
create policy "users delete own comment" on comments for delete using (auth.uid() = user_id);
