import React from "react";

export default function OnlineUsers({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 bg-neutral-800/50 px-3 py-1.5 rounded-lg border border-blue-600/30">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-blue-400 font-semibold text-sm sm:text-base">
        {count} online
      </span>
    </div>
  );
}
