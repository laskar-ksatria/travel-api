const mongoose = require("mongoose");

const TopupHistorySchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: [true, "Order id cannot be empty"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = TopupHistorySchema;
