import mongoose, { Schema, Document } from "mongoose";

export interface IGridCell {
  row: number;
  col: number;
  char: string | null;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface IGrid extends Document {
  size: number;
  cells: IGridCell[];
}

const GridCellSchema = new Schema<IGridCell>({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
  char: { type: String, default: null },
  updatedBy: { type: String },
  updatedAt: { type: Date },
});

const GridSchema = new Schema<IGrid>({
  size: { type: Number, required: true },
  cells: { type: [GridCellSchema], required: true },
});

export default mongoose.model<IGrid>("Grid", GridSchema);
