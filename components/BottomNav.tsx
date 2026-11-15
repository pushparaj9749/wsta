export default function BottomNav() {
  const items = [
    { icon: "🏠", href: "/" },
    { icon: "🔍", href: "/explore" },
    { icon: "➕", href: "/create" },
    { icon: "🎬", href: "/reels" },
    { icon: "👤", href: "/profile/you" },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around py-3 text-2xl z-40">
      {items.map((it, i) => (
        <a key={i} href={it.href}>{it.icon}</a>
      ))}
    </nav>
  );
}
