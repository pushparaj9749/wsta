import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Messages() {
  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10 flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-5xl">💬</p>
        <h1 className="text-xl font-bold mt-4">Messages (Phase 2)</h1>
        <p className="text-gray-500 text-sm mt-2 text-center max-w-sm">DM me E2EE lock lagega. Pehle public post wala MVP complete karte hain.</p>
      </main>
      <BottomNav />
    </div>
  );
}
