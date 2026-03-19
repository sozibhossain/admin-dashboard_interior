"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, LayoutGrid, CheckCircle2, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-6 p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-40 bg-[#e4dac9]" />
          <Skeleton className="h-40 bg-[#e4dac9]" />
          <Skeleton className="h-40 bg-[#e4dac9]" />
        </div>
        <Skeleton className="h-[450px] bg-[#e4dac9]" />
      </div>
    );
  }

  const summary = data?.summary;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p className="text-[#4f4638]">Create and manage your Category with ease.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Projects */}
        <Card className="relative overflow-hidden border border-[#8a6500]/30 bg-[#f4ece0]/90 p-6 transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8a6500] text-white">
              <LayoutGrid size={20} />
            </div>
            <span className="text-lg font-medium text-[#3d331f]">Total Projects</span>
          </div>
          <p className="mt-6 text-5xl font-bold text-[#8a6500]">{summary?.totalProjects ?? 500}</p>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#8a6500]" />
        </Card>

        {/* Completed Projects */}
        <Card className="relative overflow-hidden border border-[#8a6500]/30 bg-[#efe3cf]/90 p-6 transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7a5c0a] text-white">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-lg font-medium text-[#3d331f]">Total completed Projects</span>
          </div>
          <p className="mt-6 text-5xl font-bold text-[#7a5c0a]">{summary?.finishedProjects ?? 200}</p>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#7a5c0a]" />
        </Card>

        {/* Ongoing Projects */}
        <Card className="relative overflow-hidden border border-[#8a6500]/30 bg-[#f7efe1]/90 p-6 transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6b4f02] text-white">
              <BookOpen size={20} />
            </div>
            <span className="text-lg font-medium text-[#3d331f]">Ongoing Projects</span>
          </div>
          <p className="mt-6 text-5xl font-bold text-[#6b4f02]">{summary?.activeProjects ?? 300}</p>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#6b4f02]" />
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="border border-[#8a6500]/30 bg-[#f3ebde]/85 p-6 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#3d331f]">Total joining Students</h3>
          <button className="flex items-center gap-2 rounded-lg border border-[#8a6500]/35 bg-[#f8f3e8] px-4 py-1.5 text-sm font-medium text-[#5a430a] hover:bg-[#ece0cb]">
            This Week <ChevronDown size={16} />
          </button>
        </div>

        <div className="relative h-[300px] w-full rounded-xl border border-[#8a6500]/15 bg-[#f8f3e8]/70 p-4">
          {/* Simple Chart Simulation with SVG Area */}
          <svg className="h-full w-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8a6500" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8a6500" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Grid Lines */}
            <line x1="0" y1="75" x2="1000" y2="75" stroke="#8a6500" strokeOpacity="0.12" />
            <line x1="0" y1="150" x2="1000" y2="150" stroke="#8a6500" strokeOpacity="0.12" />
            <line x1="0" y1="225" x2="1000" y2="225" stroke="#8a6500" strokeOpacity="0.12" />

            {/* Area Fill */}
            <path
              d="M0,250 Q100,230 200,210 T400,160 T600,140 T800,170 T1000,150 L1000,300 L0,300 Z"
              fill="url(#chartGradient)"
            />
            
            {/* Main Line */}
            <path
              d="M0,250 Q100,230 200,210 T400,160 T600,140 T800,170 T1000,150"
              fill="none"
              stroke="#8a6500"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
          
          {/* X-Axis Labels */}
          <div className="mt-4 flex justify-between px-2 text-xs font-medium text-[#7a6e58]">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
