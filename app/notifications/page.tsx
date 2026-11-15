import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Notifications() {
  return (
    <div className="mx-auto flex max-w-5xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 md:pb-10 max-w-lg mx-auto w-full">
        <h1 className="text-xl font-bold py-4">Notifications</h1>
        <p className="text-gray-500 text-sm">Abhi koi notification nahi. Like/comment karne pe yaha aayega.</p>
      </main>
      <BottomNav />
    </div>
  );
}
