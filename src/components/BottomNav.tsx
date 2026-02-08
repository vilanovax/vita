"use client";

import Link from "next/link";

const navItems = [
  { id: "today", label: "امروز", href: "/today", icon: "📋" },
  { id: "chat", label: "چت", href: "/chat", icon: "💬" },
  { id: "routines", label: "روتین", href: "/routine", icon: "☀️" },
  { id: "progress", label: "پیشرفت", href: "/progress", icon: "📊" },
];

export default function BottomNav({ active }: { active: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 safe-bottom border-t border-border bg-surface/90 backdrop-blur">
      <div className="flex justify-around px-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition ${
              active === item.id
                ? "text-primary"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
