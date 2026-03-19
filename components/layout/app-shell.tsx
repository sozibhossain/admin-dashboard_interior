"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { getProfile } from "@/lib/api";
import { getInitials } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const [open, setOpen] = useState(false);
  const displayName = profile?.name ?? data?.user?.name ?? "Admin";
  const displayRole = String(profile?.role ?? data?.user?.role ?? "admin")
    .replace(/[-_]/g, " ")
    .trim()
    .toLowerCase();
  const avatarUrl = profile?.avatar?.url;

  return (
    <div className="flex h-screen overflow-hidden bg-transparent text-[#2f2615]">
      {/* Desktop Sidebar - Fixed Width */}
      <aside className="hidden w-[300px] flex-col border-r border-[#8a6500]/30 lg:flex">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - Fixed Height */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-[#8a6500]/40 bg-[#e6e1db]/65 px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="rounded-md border border-[#8a6500]/50 p-2 text-[#8a6500] lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-[#5a430a]">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#8a6500]/45 bg-[#f1e9db] px-2 py-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#8a6500]/50 bg-[#f1e9db] text-base font-bold text-[#6b4f02]">
              {avatarUrl ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${avatarUrl})` }}
                />
              ) : (
                getInitials(displayName)
              )}
            </div>
            <div className="min-w-0 pr-2">
              <p className="max-w-[150px] truncate text-sm font-semibold text-[#4d3b12]">
                {displayName}
              </p>
              <p className="text-xs capitalize tracking-wide text-[#7a6e58]">
                {displayRole}
              </p>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#9b8a6d] p-5 lg:p-8">
          <div className="">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 bg-[linear-gradient(180deg,_#E6E1DB_0%,_#847C69_98.36%)] shadow-xl transition-transform">
            <Sidebar mobile onNav={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
