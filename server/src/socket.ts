import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { ensureGrid, getGrid, updateCell, getHistory } from "./utils/gridUtils";

interface PlayerState {
  lastActionAt?: number;
}

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const players = new Map<string, PlayerState>();

  io.on("connection", async (socket: Socket) => {
    players.set(socket.id, {});

    const grid = await ensureGrid(10);
    socket.emit("initial-grid", grid);
    io.emit("online-count", { count: players.size });

    socket.emit("history", await getHistory(100));

    socket.on(
      "place-char",
      async (payload: { row: number; col: number; char: string }) => {
        try {
          const { row, col, char } = payload;
          if (
            typeof row !== "number" ||
            typeof col !== "number" ||
            typeof char !== "string"
          )
            return;
          if (char.length === 0) return;

          const state = players.get(socket.id) || {};
          const cooldownSeconds = Number(
            process.env.GRID_COOLDOWN_SECONDS || 60
          );
          const now = Date.now();
          
          if (
            state.lastActionAt &&
            now - state.lastActionAt < cooldownSeconds * 1000
          ) {
            const remaining = Math.ceil(
              (cooldownSeconds * 1000 - (now - state.lastActionAt)) / 1000
            );
            socket.emit("action-denied", { reason: "cooldown", remaining });
            return;
          }

          const updated = await updateCell(
            row,
            col,
            char,
            socket.id,
            socket.id
          );

          players.set(socket.id, { lastActionAt: now });
          
          io.emit("cell-updated", {
            row,
            col,
            char,
            updatedBy: socket.id,
            updatedAt: updated.updatedAt,
          });
          io.emit("history", await getHistory(100));
        } catch (err: any) {
          console.error("place-char error", err);
          socket.emit("action-denied", {
            reason: "server-error",
            message: err.message,
          });
        }
      }
    );

    socket.on("request-grid", async () => {
      socket.emit("initial-grid", await getGrid());
    });

    socket.on("request-history", async () => {
      socket.emit("history", await getHistory(500));
    });

    socket.on("disconnect", () => {
      players.delete(socket.id);
      io.emit("online-count", { count: players.size });
    });
  });

  return io;
}
