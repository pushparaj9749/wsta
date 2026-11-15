import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Explore() {
  const imgs = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/ex${i}/400/400`);
  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10">
        <h1 className="text-xl font-bold py-4">Explore</h1>
        <div className="grid grid-cols-3 gap-1">
          {imgs.map((src, i) => (
            <img key={i} src={src} alt="explore" className="aspect-square object-cover w-full" />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
