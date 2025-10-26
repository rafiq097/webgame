import React from "react";
import Block from "./Block";

export default function GridBoard({
  grid,
  socket,
  setCooldown,
  cooldownRemaining,
}: any) {
  if (!grid) {
    return (
      <div className="text-blue-400 animate-pulse text-center py-8">
        Loading grid...
      </div>
    );
  }

  const size = grid.size || 10;
  const isDisabled = cooldownRemaining !== null;

  const onPlace = (row: number, col: number, char: string) => {
    socket.emit("place-char", { row, col, char });
    setCooldown?.(60);
  };

  const rows = [];
  for (let r = 0; r < size; r++) {
    rows.push(grid.cells.filter((c: any) => c.row === r));
  }

  return (
    <div className="flex-1 flex justify-center items-start">
      <div className="inline-block">
        <div className="flex flex-col gap-1 p-2 sm:p-4 bg-neutral-800/50 rounded-xl border border-blue-600/30">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1">
              {row.map((cell: any) => (
                <Block
                  key={`${cell.row}-${cell.col}`}
                  cell={cell}
                  onPlace={onPlace}
                  isDisabled={isDisabled}
                />
              ))}
            </div>
          ))}
        </div>
        {isDisabled && (
          <div className="mt-3 text-center text-sm text-yellow-400 bg-yellow-900/20 border border-yellow-600/30 rounded-lg px-3 py-2">
            ⏳ Cooldown active - wait {cooldownRemaining}s
          </div>
        )}
      </div>
    </div>
  );
}
