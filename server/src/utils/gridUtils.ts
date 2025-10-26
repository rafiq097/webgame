import GridModel, { IGridCell } from "../models/grid.model";
import HistoryModel from "../models/history.model";

export async function ensureGrid(size = 10) {
  let grid = await GridModel.findOne();
  if (!grid) {
    const cells: IGridCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({ row: r, col: c, char: null });
      }
    }
    grid = await GridModel.create({ size, cells });
  }
  return grid;
}

export async function getGrid() {
  return GridModel.findOne().lean();
}

export async function updateCell(
  row: number,
  col: number,
  char: string,
  updatedBy: string,
  socketId?: string
) {
  const grid = await GridModel.findOne();
  if (!grid) throw new Error("Grid not found");
  const cell = grid.cells.find((c) => c.row === row && c.col === col);
  if (!cell) throw new Error("Cell not found");
  cell.char = char;
  cell.updatedBy = updatedBy;
  cell.updatedAt = new Date();
  await grid.save();
  await HistoryModel.create({
    row,
    col,
    char,
    updatedBy,
    updatedAt: cell.updatedAt,
    socketId,
  });
  return cell;
}

export async function getHistory(limit = 200) {
  return HistoryModel.find().sort({ updatedAt: -1 }).limit(limit).lean();
}
