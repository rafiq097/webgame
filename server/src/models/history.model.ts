import mongoose, { Schema, Document } from "mongoose";

export interface IHistoryItem extends Document {
  row: number;
  col: number;
  char: string | null;
  updatedBy: string;
  updatedAt: Date;
  socketId?: string;
}

const HistorySchema = new Schema<IHistoryItem>({
  row: Number,
  col: Number,
  char: String,
  updatedBy: String,
  updatedAt: { type: Date, default: Date.now },
  socketId: String,
});

export default mongoose.model<IHistoryItem>("History", HistorySchema);
