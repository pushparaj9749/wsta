import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Reels() {
  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10 flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-5xl">🎬</p>
        <h1 className="text-xl font-bold mt-4">Reels (Phase 2)</h1>
        <p className="text-gray-500 text-sm mt-2 text-center max-w-sm">Video compress (H.265, 720p) ke saath baad me aayega. Pehle photo MVP chal jaye.</p>
      </main>
      <BottomNav />
    </div>
  );
}
