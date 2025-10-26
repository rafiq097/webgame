import React, { useEffect, useState } from "react";
import { socket } from "./utils/socket";
import GridBoard from "./components/GridBoard";
import OnlineUsers from "./components/OnlineUsers";
import History from "./components/History";
import { fetchGrid, fetchHistory } from "./utils/api";

export default function App() {
  const [grid, setGrid] = useState<any>(null);
  const [online, setOnline] = useState<number>(3);
  const [history, setHistory] = useState<any[]>([]);
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(
    null
  );

  useEffect(() => {
    socket.on("initial-grid", setGrid);
    socket.on("cell-updated", (update) => {
      setGrid((prev: any) => {
        const next = structuredClone(prev);
        const cell = next.cells.find(
          (c: any) => c.row === update.row && c.col === update.col
        );
        if (cell) Object.assign(cell, update);
        return next;
      });
    });
    socket.on("online-count", ({ count }) => setOnline(count));
    socket.on("history", setHistory);

    fetchGrid().then(setGrid);
    fetchHistory().then(setHistory);

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (cooldownRemaining == null) return;
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => (prev && prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-3 sm:p-4 md:p-6 bg-gradient-to-br from-black via-gray-900 to-blue-950 text-blue-400 transition-all">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>

      <header className="w-full max-w-7xl mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-b border-blue-600/50">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🌐 Multiplayer Unicode Grid
          </h1>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <OnlineUsers count={online} />
            <div
              className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg border ${
                cooldownRemaining
                  ? "bg-red-900/20 border-red-600/30 text-red-400"
                  : "bg-green-900/20 border-green-600/30 text-green-400"
              }`}
            >
              {cooldownRemaining ? `⏱️ ${cooldownRemaining}s` : "🟢 Ready"}
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 sm:gap-6 animate-[fadeIn_0.5s_ease-in-out]">
        <GridBoard
          grid={grid}
          socket={socket}
          setCooldown={setCooldownRemaining}
          cooldownRemaining={cooldownRemaining}
        />
        <History history={history} />
      </main>
    </div>
  );
}
