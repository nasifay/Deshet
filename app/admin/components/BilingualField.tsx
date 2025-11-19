"use client";

import { Globe } from "lucide-react";

interface BilingualFieldProps {
  label: string;
  value: string | { en: string; am: string } | undefined;
  onChange: (value: { en: string; am: string }) => void;
  placeholder?: { en?: string; am?: string };
  type?: "text" | "textarea";
  rows?: number;
  className?: string;
}

/**
 * Bilingual Field Component
 * Handles fields that need both English and Amharic content
 */
export default function BilingualField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows = 3,
  className = "",
}: BilingualFieldProps) {
  // Normalize value to bilingual object
  const bilingualValue =
    typeof value === "object" && value !== null && "en" in value
      ? (value as { en: string; am: string })
      : { en: (value as string) || "", am: "" };

  const handleEnChange = (enValue: string) => {
    onChange({ ...bilingualValue, en: enValue });
  };

  const handleAmChange = (amValue: string) => {
    onChange({ ...bilingualValue, am: amValue });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm";

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
        <Globe className="w-4 h-4" />
        {label} (Bilingual)
      </label>
      
      <div className="space-y-3">
        {/* English Field */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            English 🇬🇧
          </label>
          {type === "textarea" ? (
            <textarea
              value={bilingualValue.en}
              onChange={(e) => handleEnChange(e.target.value)}
              rows={rows}
              className={inputClass + " resize-none"}
              placeholder={placeholder?.en || "Enter English text..."}
            />
          ) : (
            <input
              type="text"
              value={bilingualValue.en}
              onChange={(e) => handleEnChange(e.target.value)}
              className={inputClass}
              placeholder={placeholder?.en || "Enter English text..."}
            />
          )}
        </div>

        {/* Amharic Field */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Amharic 🇪🇹 (አማርኛ)
          </label>
          {type === "textarea" ? (
            <textarea
              value={bilingualValue.am}
              onChange={(e) => handleAmChange(e.target.value)}
              rows={rows}
              className={inputClass + " resize-none font-amharic"}
              placeholder={placeholder?.am || "አማርኛ ጽሑፍ ያስገቡ..."}
              dir="ltr"
            />
          ) : (
            <input
              type="text"
              value={bilingualValue.am}
              onChange={(e) => handleAmChange(e.target.value)}
              className={inputClass + " font-amharic"}
              placeholder={placeholder?.am || "አማርኛ ጽሑፍ ያስገቡ..."}
              dir="ltr"
            />
          )}
        </div>
      </div>
    </div>
  );
}


