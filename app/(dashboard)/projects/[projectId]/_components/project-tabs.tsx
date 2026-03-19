import type { ActiveTab } from "./types";

type ProjectTabsProps = {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
};

const TAB_ITEMS: Array<{ key: ActiveTab; label: string }> = [
  { key: "task", label: "Task" },
  { key: "updates", label: "Updates" },
  { key: "documents", label: "Documents" },
];

export function ProjectTabs({ activeTab, onTabChange }: ProjectTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {TAB_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`text-title-24 rounded-md border px-4 py-2 transition-colors ${
            activeTab === item.key
              ? "border-[#8a6500] bg-[#8a6500] text-white"
              : "border-[#8a6500]/35 bg-[#f3ebde]/75 text-[#3d331f] hover:bg-[#ebe0cb]"
          }`}
          onClick={() => onTabChange(item.key)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
