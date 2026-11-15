import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import PostCard from "@/components/PostCard";
import { demoPosts, demoStories } from "@/lib/demo";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 min-w-0 px-4 pb-24 md:pb-10">
        <div className="md:hidden flex items-center justify-between py-3">
          <h1 className="text-xl font-bold">WSTA</h1>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Demo Mode</span>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar py-4 border-b border-gray-100">
          {demoStories.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1 shrink-0">
              <div className={`rounded-full p-[3px] ${s.seen ? "bg-gray-300" : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"}`}>
                <img src={s.avatar} alt={s.user} className="h-14 w-14 rounded-full border-2 border-white object-cover" />
              </div>
              <span className="text-xs">{s.user}</span>
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          {demoPosts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
