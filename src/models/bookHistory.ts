import mongoose, { Schema, model, models } from "mongoose";

const bookHistorySchema = new Schema({
    tourId: mongoose.Types.ObjectId,
    tourName: String,
    email: String,
    quantity: Number,
    time: { type: Date, default: Date.now() },
    status: String,
    paymentMethod: String,
    total: Number,
    slot: Number,
})

const bookHistory = models.bookhistories || model('bookhistories', bookHistorySchema);

export default bookHistory