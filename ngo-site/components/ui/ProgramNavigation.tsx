import React, { useState } from "react";

interface NavigationItem {
  id: string;
  label: string;
  isActive: boolean;
}

interface ProgramNavigationProps {
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export default function ProgramNavigation({
  onTabChange,
  className = "",
}: ProgramNavigationProps) {
  const [activeTab, setActiveTab] = useState("youth-empowerment");

  const navigationItems: NavigationItem[] = [
    {
      id: "youth-empowerment",
      label: "Youth Empowerment &\nPeacebuilding",
      isActive: true,
    },
    {
      id: "srh-gender",
      label: "SRH & Gender\nDevelopment",
      isActive: false,
    },
    {
      id: "climate-justice",
      label: "Climate Justice &\nLivelihoods",
      isActive: false,
    },
    {
      id: "empty",
      label: "",
      isActive: false,
    },
  ];

  const handleTabClick = (id: string) => {
    if (id !== "empty") {
      setActiveTab(id);
      onTabChange?.(id);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Navigation Bar - Pixel Perfect Match */}
      <div className="relative bg-white border-t-[1px] border-b-[1px] border-black overflow-hidden">
        <div className="flex h-[60px] sm:h-[65px] lg:h-[70px]">
          {navigationItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Vertical Divider - Exact specifications */}
              {index > 0 && <div className="w-px bg-[#E0E0E0] my-2" />}

              {/* Navigation Item */}
              <button
                onClick={() => handleTabClick(item.id)}
                disabled={item.id === "empty"}
                className={`flex-1 flex items-center justify-center px-2 sm:px-4 lg:px-6 py-2 h-full transition-all duration-200 ease-in-out ${
                  item.id === "empty"
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:ring-opacity-50"
                }`}
                aria-label={item.label || "Empty section"}
                role="tab"
                aria-selected={activeTab === item.id}
                tabIndex={item.id === "empty" ? -1 : 0}
              >
                {item.label && (
                  <span
                    className={`text-center font-normal leading-[1.2] whitespace-pre-line select-none text-xs sm:text-sm lg:text-sm ${
                      activeTab === item.id
                        ? "text-[#F7931E]"
                        : "text-[#4A4A4A] hover:text-[#F7931E]"
                    }`}
                    style={{
                      fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0px",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
