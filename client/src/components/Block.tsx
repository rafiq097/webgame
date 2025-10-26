import React, { useState } from "react";
import { X } from "lucide-react";

export default function Block({ cell, onPlace, isDisabled }: any) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (!cell.char && !isDisabled) {
      setEditing(true);
    }
  };

  const handleClose = () => {
    setEditing(false);
    setValue("");
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    onPlace(cell.row, cell.col, value);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      <div
        className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border border-blue-600 bg-neutral-900 transition-all duration-200 ${
          cell.char
            ? "opacity-80 cursor-default"
            : isDisabled
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-105 hover:bg-blue-900/40 hover:border-blue-400 cursor-pointer"
        }`}
        onClick={handleClick}
      >
        <span className="text-base sm:text-lg md:text-xl font-bold select-none">
          {cell.char || ""}
        </span>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative bg-neutral-900 rounded-2xl shadow-2xl border-2 border-blue-500 p-6 w-full max-w-sm animate-[fadeIn_0.2s_ease-in-out]">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-blue-300 mb-4">
              Place Character
            </h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Position: [{cell.row}, {cell.col}]
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value.slice(0, 2))}
                onKeyDown={handleKeyDown}
                maxLength={2}
                autoFocus
                placeholder="Enter character or emoji"
                className="w-full text-center bg-neutral-800 border-2 border-blue-500 rounded-lg text-blue-300 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 px-4 py-3 text-2xl transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter any character, emoji, or symbol (max 2 chars)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!value.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-3 rounded-lg text-white transition-colors font-semibold text-base shadow-lg disabled:shadow-none"
              >
                Place Character
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors font-semibold text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
