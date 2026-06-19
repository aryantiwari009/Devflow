import {Schema, model, models, Types} from 'mongoose';

export interface IVote {
    author: Types.ObjectId;
    answer: Types.ObjectId;
    type: "question" | "answer";
    voteType: "upvote" | "downvote";
}

const voteSchema = new Schema<IVote>({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answer: { type: Schema.Types.ObjectId, ref: "answer", required: true },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true }
);

const Vote = models?.vote || model<IVote>("vote", voteSchema);

export default Vote;
