export default function Sidebar() {
  const items = [
    { icon: "🏠", label: "Home", href: "/" },
    { icon: "🔍", label: "Explore", href: "/explore" },
    { icon: "🎬", label: "Reels", href: "/reels" },
    { icon: "💬", label: "Messages", href: "/messages" },
    { icon: "❤️", label: "Notifications", href: "/notifications" },
    { icon: "➕", label: "Create", href: "/create" },
    { icon: "👤", label: "Profile", href: "/profile/you" },
  ];
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-gray-200 px-3 py-6 sticky top-0 h-screen">
      <h1 className="text-2xl font-bold px-3 pb-8">WSTA</h1>
      <nav className="space-y-1">
        {items.map((it) => (
          <a key={it.label} href={it.href} className="flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-gray-100 text-[15px]">
            <span className="text-xl">{it.icon}</span> {it.label}
          </a>
        ))}
      </nav>
      <p className="mt-auto px-3 text-xs text-gray-400">Compress + Cloud • ₹0/month</p>
    </aside>
  );
}
