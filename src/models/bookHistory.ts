import mongoose, { Schema, model, models } from "mongoose";
import { tourScheduleSchema } from './tourSchedule'

const bookHistorySchema = new Schema({
    tour: tourScheduleSchema,
    userId: mongoose.Types.ObjectId,
    quantity: Number,
})

const bookHistory = models.bookhistory || model('bookhistory', bookHistorySchema);

export default bookHistory