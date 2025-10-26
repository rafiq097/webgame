import React from "react";

export default function History({ history }: { history: any[] }) {
  return (
    <div className="w-full md:w-80 lg:w-96 bg-neutral-900/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-600/50 animate-[fadeIn_0.5s_ease-in-out] overflow-hidden">
      <h3 className="text-lg font-bold mb-3 text-blue-300 flex items-center gap-2">
        <span>📜</span> Recent Updates
      </h3>
      <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {history.length ? (
          history.map((h, i) => (
            <div
              key={i}
              className="text-sm text-blue-300 bg-neutral-800/50 rounded-lg p-2.5 border border-gray-700/50 hover:border-blue-600/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">
                  [{h.row},{h.col}]
                </span>
                <span className="text-xl">{h.char}</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {new Date(h.updatedAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-8 text-sm">
            No updates yet
          </div>
        )}
      </div>
    </div>
  );
}
