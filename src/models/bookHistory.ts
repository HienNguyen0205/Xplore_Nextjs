import { Schema, model, models } from "mongoose";

const bookHistorySchema = new Schema({
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'schedules',
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'tourschedules',
    },
    email: String,
    quantity: { type: Number, min: 1 },
    time: { type: Date, default: Date.now() },
    status: String,
    paymentMethod: String,
    total: Number,
})

const bookHistory = models.bookhistories || model('bookhistories', bookHistorySchema);

export default bookHistory