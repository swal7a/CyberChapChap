// src/components/ui/checkbox.jsx
import React from "react";
import { Check } from "lucide-react";

export function Checkbox({ checked, onCheckedChange, id, ...props }) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#00D084] data-[state=checked]:border-[#00D084]"
      data-state={checked ? "checked" : "unchecked"}
      id={id}
      {...props}
    >
      <span className="sr-only">Checkbox</span>
      {checked && <Check className="h-4 w-4 text-white" />}
    </div>
  );
}