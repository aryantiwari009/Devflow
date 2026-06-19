import { Schema, model, models, Types } from "mongoose";

export interface Interaction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

const interactionSchema = new Schema(
    {
        user: {type:Schema.Types.ObjectId, ref: "User", required: true},
        action: { type: String, required: true },
        actionId: { type: Schema.Types.ObjectId, required: true },
        actionType: { type: String,enum:["question", "answer"], required: true },
    },
    { timestamps: true }
);

const Interaction =
  models.Interaction || model("Interaction", interactionSchema);

export default Interaction;
