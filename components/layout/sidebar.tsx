"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { FolderOpen, LayoutDashboard, LogOut, Settings, UserPlus, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/managers", label: "Manager's", icon: UserPlus },
  { href: "/financials", label: "Financials", icon: Wallet },
];

export function Sidebar({ mobile = false, onNav }: { mobile?: boolean; onNav?: () => void }) {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col bg-[linear-gradient(180deg,_#E6E1DB_0%,_#847C69_98.36%)] px-5 py-6",
        mobile ? "border-r border-[#8a6500]/35" : "",
      )}
    >
      <div className="mb-8 flex items-center justify-center">
        {!logoError ? (
          <Image
            src="/logo.png"
            alt="NF logo"
            width={500}
            height={500}
            unoptimized
            className="h-[141px] w-[150px] object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="font-clash text-[#5f490d]">Logo</span>
        )}
      </div>

      <nav className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              className={cn(
                "text-body-16 flex h-10 items-center gap-3 rounded-lg border px-4",
                active
                  ? "border-[#8a6500] bg-[#8a6500] text-white"
                  : "border-[#8a6500]/40 bg-[#f4eee2]/70 text-[#4a3a13] hover:bg-[#e8deca]",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        <Link
          href="/settings"
          onClick={onNav}
          className={cn(
            "text-body-16 flex h-10 items-center gap-3 rounded-lg border px-4",
            pathname === "/settings"
              ? "border-[#8a6500] bg-[#8a6500] text-white"
              : "border-[#8a6500]/40 bg-[#f4eee2]/70 text-[#4a3a13] hover:bg-[#e8deca]",
          )}
        >
          <Settings className="h-5 w-5" />
          Setting
        </Link>

        <button
          type="button"
          className="text-body-16 flex h-10 w-full items-center gap-3 rounded-lg bg-[#8a6500] px-4 text-white hover:bg-[#735500]"
          onClick={() => setLogoutOpen(true)}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-md border-[#8a6500]/60 bg-[linear-gradient(180deg,_#E6E1DB_0%,_#847C69_98.36%)]">
          <DialogHeader>
            <DialogTitle className="text-[#8a6500]">Logout</DialogTitle>
            <DialogDescription className="text-[#4f4638]">
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setLogoutOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#8a6500] text-white hover:bg-[#735500]"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
