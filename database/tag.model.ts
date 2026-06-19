import {Schema, model, models} from 'mongoose';

export interface ITag {
    name: string;
    questions: number;
}

const tagSchema = new Schema<ITag>({
    name: { type: String, required: true, unique: true },
    questions: {type: Number, default: 0},
  },
  { timestamps: true }
);

const Tag = models?.tag || model<ITag>("tag", tagSchema);

export default Tag;