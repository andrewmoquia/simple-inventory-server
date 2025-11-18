import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
    name: string;
    quantity: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

const ItemSchema = new Schema<IItem>(
    {
        name: { type: String, required: true, trim: true, index: true },
        quantity: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    },
);

export const ItemModel = model<IItem>('Item', ItemSchema, 'items');
