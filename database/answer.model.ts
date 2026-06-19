import { Schema, Types, model, models } from "mongoose";

interface IAnswer {
    author: Types.ObjectId;
    question: Types.ObjectId;
    content: string;
    upvotes: number;
    downvotes: number;
}

const answerSchema = new Schema<IAnswer>({
    author:{type:Schema.Types.ObjectId, ref:"user", required:true},
    question:{type:Schema.Types.ObjectId, ref:"question", required:true},
    content:{type:String, required:true},
    upvotes:{type:Number, default:0},
    downvotes:{type:Number, default:0},
  },
  { timestamps: true }
);

const Answer = models?.answer || model<IAnswer>("answer", answerSchema);

export default Answer;
