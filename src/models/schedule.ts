import { Schema, model, models } from "mongoose";

const scheduleSchema = new Schema({
    slot: { type: Number, min: 0, max: 20 },
    date: {
        from: Date,
        to: Date,
    },
    status: { type: Boolean, default: true },
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'tourschedules',
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'bookhistories',
    }],
    expireAt: Date
})

const schedule =
  models.schedules || model("schedules", scheduleSchema);

export default schedule