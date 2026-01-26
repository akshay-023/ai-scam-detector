import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inputText: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
    },
    riskScore: {
      type: Number,
      required: true,
    },
    reasons: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
