import {Schema, model, models, Types} from 'mongoose';

export interface ITagQuestion {
    tag: Types.ObjectId;
    question: Types.ObjectId;
}

const tagQuestionSchema = new Schema<ITagQuestion>({
    tag: { type: Schema.Types.ObjectId, ref: "tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "question", required: true },
  },
  { timestamps: true }
);

const TagQuestion = models?.tagQuestion || model<ITagQuestion>("tagQuestion", tagQuestionSchema);

export default TagQuestion;