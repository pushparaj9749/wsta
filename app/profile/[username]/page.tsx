import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const imgs = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/pf${i}/400/400`);
  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10">
        <div className="flex items-center gap-8 py-6">
          <img src="https://picsum.photos/seed/you/200/200" alt="avatar" className="h-24 w-24 rounded-full object-cover" />
          <div>
            <h1 className="text-xl font-semibold">{username}</h1>
            <div className="flex gap-6 mt-3 text-sm">
              <span><b>42</b> posts</span><span><b>1.2K</b> followers</span><span><b>310</b> following</span>
            </div>
            <p className="text-sm mt-2 text-gray-600">WSTA banane wala bhai 🚀 Durgapur</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {imgs.map((src, i) => <img key={i} src={src} alt="post" className="aspect-square object-cover w-full" />)}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
